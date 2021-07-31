// import { RecordTypes } from 'cloudflare'


// type:
// | 'A'
// | 'AAAA'
// // | 'CNAME'
// // | 'HTTPS'
// | 'TXT'
// // | 'SRV'
// // | 'LOC'
// | 'MX'
// // | 'NS'
// // | 'SPF'
// // | 'CERT'
// // | 'DNSKEY'
// // | 'DS'
// // | 'NAPTR'
// // | 'SMIMEA'
// // | 'SSHFP'
// // | 'SVCB'
// // | 'TLSA'
// // | 'URI read only'

type ConfigRecordCommonFields = {
	name: string
}
export type ConfigRecordProxied = {
	proxied?: boolean
}
type ConfigRecordA = ConfigRecordCommonFields & { type: 'A', ipv4: string } & ConfigRecordProxied
type ConfigRecordAAAA = ConfigRecordCommonFields & { type: 'AAAA', ipv6: string } & ConfigRecordProxied
type ConfigRecordMX = ConfigRecordCommonFields & { type: 'MX', mailServer: string, ttl?: number, priority: number }
type ConfigRecordTXT = ConfigRecordCommonFields & { type: 'TXT', content: string, ttl?: number}
/**
 * Record coming from the setup in `DNS-RECORDS.hjson`.
 */
export type ConfigRecord = ConfigRecordA | ConfigRecordAAAA | ConfigRecordMX | ConfigRecordTXT

export type Config = {
	records: ConfigRecord[]
}
