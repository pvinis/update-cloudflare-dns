import { RecordTypes } from 'cloudflare'
import { absurd } from "fp-ts/lib/function"
import { cons } from 'fp-ts/lib/ReadonlyArray'
import { record } from 'fp-ts/lib/Record'
import { ConfigRecord, RemoteRecord } from './types'


export const niceRecordName = (rec: RemoteRecord): string => {
	const removeZone = rec.name.replace(rec.zone_name, "")
	if (removeZone === "") return "@"
	return removeZone.slice(0, -1)
}


export const sameRecord = (remoteRecord: RemoteRecord, configRecord: ConfigRecord): boolean => {
		if (remoteRecord.type !== configRecord.type) return false

		const niceName = niceRecordName(remoteRecord)
		if (niceName !== configRecord.name) return false

		switch (configRecord.type) {
			case "A":
				if (remoteRecord.content !== configRecord.ipv4) return false
				break

			case "AAAA":
				if (remoteRecord.content !== configRecord.ipv6) return false
				// check for proxied
				break


			case "TXT":
				if (remoteRecord.content !== configRecord.content) return false
				break


			default: absurd(configRecord)
		}

		return true
}


export const recordContent = (record: ConfigRecord): string => {
	switch (record.type) {
		case "A": return record.ipv4
		case "AAAA": return record.ipv6
		case "TXT": return record.content
	}
	absurd(record)
}


export const printRemoteRecord = (record: RemoteRecord, full: boolean = false): string => {
	const name = full ? `${record.name}.` : niceRecordName(record)
	return `${name}\t1\tIN\t${record.type}\t${record.content}`
}


export const printConfigRecord = (record: ConfigRecord, zone: string, full: boolean = false): string => {
	const fullName = `${
		record.name === "@" ? zone : `${record.name}.${zone}`
	}.`
	const name = full ? fullName : record.name
	const content = recordContent(record)
	return `${name}\t1\tIN\t${record.type}\t${content}`
}
