import { RecordTypes } from 'cloudflare'


/**
 * Record coming from cloudflare using their API.
 */
export interface RemoteRecord {
	id: string
	// zone_id: string
	zone_name: string,
	name: string
	type: RecordTypes
	content: string
	priority?: number
	// proxiable: boolean
	proxied: boolean
	ttl: number
	// locked: boolean
	// meta: {}
	// created_on: string
	// modified_on: string
}

type ConfigRecordCommonFields = {
	name: string
}
type ConfigRecordProxied = {
	proxied?: boolean
}
type ConfigRecordA = ConfigRecordCommonFields & { type: 'A', ipv4: string } & ConfigRecordProxied
type ConfigRecordAAAA = ConfigRecordCommonFields & { type: 'AAAA', ipv6: string } & ConfigRecordProxied
type ConfigRecordMX = ConfigRecordCommonFields & { type: 'MX', mailServer: string, ttl?: number, priority: number }
type ConfigRecordTXT = ConfigRecordCommonFields & { type: 'TXT', content: string,  ttl?: number}
/**
 * Record coming from the setup in `DNS-RECORDS.hjson`.
 */
export type ConfigRecord = ConfigRecordA |ConfigRecordAAAA | ConfigRecordMX | ConfigRecordTXT

export type Config = {
	records: ConfigRecord[]
}
