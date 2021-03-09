import { RecordTypes } from 'cloudflare'


/**
 * Record coming from cloudflare using their API.
 */
export interface RemoteRecord {
	id: string
	type: RecordTypes
	name: string
	zone_name: string,
	content: string
	proxied: boolean
}

type ConfigRecordCommonFields = {
	name: string
}
type ConfigRecordProxied = {
	proxied?: boolean
}
type ConfigRecordA = ConfigRecordCommonFields & { type: 'A', ipv4: string } & ConfigRecordProxied
type ConfigRecordAAAA = ConfigRecordCommonFields & { type: 'AAAA', ipv6: string } & ConfigRecordProxied
type ConfigRecordTXT = ConfigRecordCommonFields & { type: 'TXT', content: string }
/**
 * Record coming from the setup in `DNS-RECORDS.hjson`.
 */
export type ConfigRecord = ConfigRecordA |ConfigRecordAAAA | ConfigRecordTXT

export type Config = {
	records: ConfigRecord[]
}
