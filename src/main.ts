import * as core from '@actions/core'
// import * as github from '@actions/github'
import { exit } from 'process'
import HJSON from 'hjson'
import fs from 'fs'
import Cloudflare from 'cloudflare'
import { absurd } from 'fp-ts/lib/function'

import {
	partitionRecords,
	printConfigRecord,
	printRemoteRecord,
	recordContent,
	sameRecord,
} from './helpers'
import { Config } from './types'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()


const inputOrEnv = (inputName: string, envName: string) => {
	const input = core.getInput(inputName)
	if (input !== '') return input

	const env = process.env[envName]
	return env
}

const main = async () => {
	const ZONE = inputOrEnv('zone', 'ZONE')
	if (ZONE === undefined) {
		console.log('Zone not set. Make sure to provide one in the GitHub action.')
		core.setFailed('Zone not set.')
		exit(-1)
	}
	//   const time = (new Date()).toTimeString();
	///   core.setOutput("time", time);
	// Get the JSON webhook payload for the event that triggered the workflow
	//   const payload = JSON.stringify(github.context.payload, undefined, 2)
	//   console.log(`The event payload: ${payload}`);

	const TOKEN = inputOrEnv('cloudflareToken', 'CLOUDFLARE_TOKEN')
	if (TOKEN === undefined) {
		console.log(
			'Cloudflare token not found. Make sure to add one in GitHub environments.'
		)
		core.setFailed('Cloudflare token not found.')
		exit(-1)
	}

	const cf = new Cloudflare({
		token: TOKEN,
	})

	const DRY_RUN: boolean = Boolean(process.env.DRY_RUN)

	const rawText = fs.readFileSync('./DNS-RECORDS.hjson').toString()
	const config: Config = HJSON.parse(rawText)

	// Find the right zone
	let zoneId = ''
	try {
		const response = await cf.zones.browse()
		const zones = response.result
		const theZones = zones
			.filter((zone) => zone.name === ZONE)
			.map((zone) => zone.id)
		if (theZones.length === 0) {
			console.log(`No zones found with name: ${ZONE}.`)
			console.log('Make sure you have it right in DNS-RECORDS.hjson.')
			core.setFailed('Zone not found.')
			exit(-1)
		}
		zoneId = theZones[0]
	} catch (err) {
		console.log(err)
		core.setFailed(err)
		exit(-1)
	}

	// Check which records need to be deleted, kept, or added
	const currentRecords = (await cf.dnsRecords.browse(zoneId)).result

	const { toBeDeleted, toBeKept, toBeAdded } = partitionRecords(
		currentRecords,
		config.records,
		sameRecord
	)

	console.log('Records that will be deleted:')
	await Promise.all(
		toBeDeleted.map(async (rec) => {
			if (!DRY_RUN) {
				try {
					await cf.dnsRecords.del(zoneId, rec.id)
					console.log('✔ ', printRemoteRecord(rec))
				} catch (err) {
					console.log('❌ ', printRemoteRecord(rec))
					console.log(err)
				}
			}
		})
	)

	console.log('Records that will be kept:')
	toBeKept.forEach((rec) => {
		console.log('✔ ', printRemoteRecord(rec))
	})

	console.log('Records that will be added:')
	await Promise.all(
		toBeAdded.map(async (rec) => {
			if (!DRY_RUN) {
				try {
					const content = recordContent(rec)
					switch (rec.type) {
						case 'A':
						case 'AAAA':
							await cf.dnsRecords.add(zoneId, {
								type: rec.type,
								name: rec.name,
								content,
								ttl: 1,
								proxied: rec.proxied ?? true,
							})
							break

						case 'TXT':
							await cf.dnsRecords.add(zoneId, {
								type: rec.type,
								name: rec.name,
								content,
								ttl: rec.ttl ?? 1,
							})
							break

						case 'MX':
							await cf.dnsRecords.add(zoneId, {
								type: 'MX',
								// type: rec.type,
								// name: rec.name,
								// content,
								// ttl: rec.ttl ?? 1,
							})
							break

						default:
							absurd(rec)
					}
					console.log('✔ ', printConfigRecord(rec, ZONE))
				} catch (err) {
					console.log('❌ ', printConfigRecord(rec, ZONE))
					console.log(err)
				}
			}
		})
	)

	// make sure it errors out if something is missing
	// add some tests for niceName, sameRec
	// make typescript
	// make sure to allow for DNS only or cached
}
main()

// make into a github action, And make this repo into a template with just a hjson and the github action and env setup
