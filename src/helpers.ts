import { absurd } from 'fp-ts/lib/function'
import * as core from '@actions/core'

import { ConfigRecord, RemoteRecord } from './types'


export const niceRecordName = (rec: RemoteRecord): string => {
	const removeZone = rec.name.replace(rec.zone_name, '')
	if (removeZone === '') return '@'
	return removeZone.slice(0, -1)
}


export const sameRecord = (remoteRecord: RemoteRecord, configRecord: ConfigRecord): boolean => {
	if (remoteRecord.type !== configRecord.type) return false

	const niceName = niceRecordName(remoteRecord)
	if (niceName !== configRecord.name) return false

	switch (configRecord.type) {
		case 'A':
			if (remoteRecord.content !== configRecord.ipv4) return false
			if (remoteRecord.proxied !== (configRecord.proxied ?? true)) return false
			break

		case 'AAAA':
			if (remoteRecord.content.toLowerCase() !== configRecord.ipv6.toLowerCase()) return false
			if (remoteRecord.proxied !== (configRecord.proxied ?? true)) return false
			break

			// case "CNAME":
			// case "HTTPS":

		case 'TXT':
			if (remoteRecord.content !== configRecord.content) return false
			if (remoteRecord.ttl !== configRecord.ttl) return false
			break

		// case "SRV":
		// case "LOC":
		//
		case 'MX':
			if (remoteRecord.content !== configRecord.mailServer) return false
			if (remoteRecord.priority !== configRecord.priority) return false
			break

			// case "NS":
			// case "SPF":
			// case "CERT":
			// case "DNSKEY":
			// case "DS":
			// case "NAPTR":
			// case "SMIMEA":
			// case "SSHFP":
			// case "SVCB":
			// case "TLSA":
			// case "URI read only":

		default: absurd(configRecord)
	}

	return true
}


export const recordContent = (record: ConfigRecord): string => {
	switch (record.type) {
		case 'A': return record.ipv4
		case 'AAAA': return record.ipv6
		case 'TXT': return record.content
		case 'MX': return record.mailServer
	}
	absurd(record)
}

export const recordTTL = (record: ConfigRecord): number => {
	switch (record.type) {
		case 'TXT': return record.ttl ?? 1
		default: return 1
	}
}

export const printRemoteRecord = (record: RemoteRecord, full: boolean = false): string => {
	const name = full ? `${record.name}.` : niceRecordName(record)
	return `${name}\t${record.ttl}\tIN\t${record.type}\t${record.priority !== undefined ? `${record.priority} ` : ''}${record.content}${record.type === 'MX' ? '.' : ''}`
}


export const printConfigRecord = (record: ConfigRecord, zone: string, full: boolean = false): string => {
	const fullName = `${
		record.name === '@' ? zone : `${record.name}.${zone}`
	}.`
	const name = full ? fullName : record.name
	let content = recordContent(record)
	const ttl = recordTTL(record)
	switch(record.type) {
		case 'TXT':
			content = `"${content}"`
			break
		case 'MX':
			content = `${record.priority} ${content}.`
			break
		default: break
	}
	return `${name}\t${ttl}\tIN\t${record.type}\t${content}`
}


export const inputOrEnv = (inputName: string, envName: string) => {
	const input = core.getInput(inputName)
	if (input !== '') return input

	const env = process.env[envName]
	return env
}


export const partitionRecords = <T, U>(remote: T[], local: U[], comparator: (_a: T, _b: U)=> boolean): {toBeDeleted: T[], toBeKept:T[], toBeAdded:U[]} => {
	const toBeDeleted = remote.filter(rec => local.findIndex(possiblySameRec => comparator(rec, possiblySameRec)) === -1)
	const toBeKept = remote.filter(rec => local.findIndex(possiblySameRec => comparator(rec, possiblySameRec)) !== -1)
	const toBeAdded = local.filter(rec => remote.findIndex(possiblySameRec => comparator(possiblySameRec, rec)) === -1)

	return { toBeDeleted, toBeKept, toBeAdded }
}
