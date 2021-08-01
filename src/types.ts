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

export type ConfigRecordCommonFields = {
	name: string
	proxied?: boolean // default: true
	ttl?: number // default: 1
}

type ConfigRecordA = ConfigRecordCommonFields & { type: 'A'; ipv4: string }
type ConfigRecordAAAA = ConfigRecordCommonFields & {
	type: 'AAAA'
	ipv6: string
}
type ConfigRecordCNAME = ConfigRecordCommonFields & {
	type: 'CNAME'
	target: string
}
type ConfigRecordHTTPS = ConfigRecordCommonFields & {
	type: 'HTTPS'
	target: string
	priority: number
	value: string
}
type ConfigRecordMX = ConfigRecordCommonFields & {
	type: 'MX'
	mailServer: string
	priority: number
}
type ConfigRecordTXT = ConfigRecordCommonFields & {
	type: 'TXT'
	content: string
}
/**
 * Record coming from the setup in `DNS-RECORDS.hjson`.
 */
export type ConfigRecord =
	| ConfigRecordA
	| ConfigRecordAAAA
	| ConfigRecordCNAME
	| ConfigRecordHTTPS
	| ConfigRecordMX
	| ConfigRecordTXT

export type Config = {
	records: ConfigRecord[]
}
