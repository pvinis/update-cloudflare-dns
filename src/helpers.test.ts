import { niceRecordName, partitionRecords, printConfigRecord, printRemoteRecord, sameRecord } from './helpers'
import { ConfigRecord, RemoteRecord } from './types'


const mockRemoteRecord = (overrides: Partial<RemoteRecord>): RemoteRecord => {
	const initial: RemoteRecord = {
		id: 'a-rec',
		type: 'TXT',
		name: 'wow.mydomain.com',
		zone_name: 'mydomain.com',
		content: 'pavlos',
		proxied: true,
	}
	return { ...initial, ...overrides }
}


describe(niceRecordName, () => {
	it('works', () => {
		expect(niceRecordName(mockRemoteRecord({
			name: 'wow.mydomain.com',
			zone_name: 'mydomain.com',
		}))).toBe('wow')

		expect(niceRecordName(mockRemoteRecord({
			name: 'mydomain.com',
			zone_name: 'mydomain.com',
		}))).toBe('@')

		expect(niceRecordName(mockRemoteRecord({
			name: '*.mydomain.com',
			zone_name: 'mydomain.com',
		}))).toBe('*')
	})
})


describe(sameRecord, () => {
	it('works', () => {
		expect(sameRecord(mockRemoteRecord({ type: 'A' }), { type: 'TXT', name: 'wow', content: 'pavlos' })).toBe(false)

		expect(sameRecord(
			mockRemoteRecord({ type: 'A', content: '11.22.33.44' }),
			{ type: 'A', name: 'wow', ipv4: '11.22.33.44' }
		)).toBe(true)

		expect(sameRecord(
			mockRemoteRecord({ type: 'A', content: '11.22.33.44' }),
			{ type: 'A', name: 'wow', ipv4: '11.22.33.44', proxied: true }
		)).toBe(true)

		expect(sameRecord(
			mockRemoteRecord({ type: 'A', content: '11.22.33.44', proxied: false }),
			{ type: 'A', name: 'wow', ipv4: '11.22.33.44', proxied: false }
		)).toBe(true)

		expect(sameRecord(
			mockRemoteRecord({ type: 'A', content: '11.22.33.44', proxied: true }),
			{ type: 'A', name: 'wow', ipv4: '11.22.33.44', proxied: false }
		)).toBe(false)

		expect(sameRecord({
		  id: '4a5dd05d8731962f547eb954e164c49f',
		  zone_name: 'xn--t9j.co',
		  name: 'mail.xn--t9j.co',
		  type: 'AAAA',
		  content: '684d:1111:222:3333:4444:5555:6:77',
		  proxied: true,
		},
		{ type: 'AAAA', name: 'mail', ipv6: '684D:1111:222:3333:4444:5555:6:77' }))
			.toBe(true)
	})
})


describe(printRemoteRecord, () => {
	it('works', () => {
		expect(printRemoteRecord(mockRemoteRecord({
			type: 'A',
			name: 'mail.mydomain.com',
			content: '11.22.33.44',
		})))
			.toBe('mail	1	IN	A	11.22.33.44')
		expect(printRemoteRecord(mockRemoteRecord({
			type: 'A',
			name: 'mydomain.com',
			content: '11.22.33.44',
		})))
			.toBe('@	1	IN	A	11.22.33.44')
	})

	it('also prints in full', () => {
		expect(printRemoteRecord(mockRemoteRecord({
			type: 'A',
			name: 'mail.mydomain.com',
			content: '11.22.33.44',
		}), true))
			.toBe('mail.mydomain.com.	1	IN	A	11.22.33.44')
		expect(printRemoteRecord(mockRemoteRecord({
			type: 'A',
			name: 'mydomain.com',
			content: '11.22.33.44',
		}), true))
			.toBe('mydomain.com.	1	IN	A	11.22.33.44')
	})
})

describe(printConfigRecord, () => {
	it('works', () => {
		expect(printConfigRecord({
			type: 'A',
			name: 'mail',
			ipv4: '11.22.33.44',
		}, 'mydomain.com'))
			.toBe('mail	1	IN	A	11.22.33.44')
		expect(printConfigRecord({
			type: 'A',
			name: '@',
			ipv4: '11.22.33.44',
		}, 'mydomain.com'))
			.toBe('@	1	IN	A	11.22.33.44')
		expect(printConfigRecord({
			type: 'TXT',
			name: '@',
			content: 'wow=pavlos',
		}, 'mydomain.com'))
			.toBe('@	1	IN	TXT	"wow=pavlos"')
	})

	it('also prints in full', () => {
		expect(printConfigRecord({
			type: 'A',
			name: 'mail',
			ipv4: '11.22.33.44',
		}, 'mydomain.com', true))
			.toBe('mail.mydomain.com.	1	IN	A	11.22.33.44')
		expect(printConfigRecord({
			type: 'A',
			name: '@',
			ipv4: '11.22.33.44',
		}, 'mydomain.com', true))
			.toBe('mydomain.com.	1	IN	A	11.22.33.44')
	})
})


describe(partitionRecords, () => {
	it('works', () => {
		const output = partitionRecords([1, 2, 3], [2, 4], (a, b) => a === b)
		expect(output.toBeDeleted).toStrictEqual([1, 3])
		expect(output.toBeKept).toStrictEqual([2])
		expect(output.toBeAdded).toStrictEqual([4])
	})

	it('really works', () => {
		const remote: RemoteRecord[] = [
			{
		  id: '01c3919a0ebb1621813aa583b2916e3e',
		  zone_name: 'xn--t9j.co',
		  name: 'mail.xn--t9j.co',
		  type: 'A',
		  content: '11.22.33.44',
		  proxied: true,
			},
			{
		  id: '4877b96db259761439a1f4b15d9393d2',
		  zone_name: 'xn--t9j.co',
		  name: 'xn--t9j.co',
		  type: 'A',
		  content: '11.22.33.44',
		  proxied: false,
			},
			{
		  id: '4a5dd05d8731962f547eb954e164c49f',
		  zone_name: 'xn--t9j.co',
		  name: 'mail.xn--t9j.co',
		  type: 'AAAA',
		  content: '684d:1111:222:3333:4444:5555:6:77',
		  proxied: true,
			},
			{
		  id: '7462e86c44e00149390c203f2a62dcb6',
		  zone_name: 'xn--t9j.co',
		  name: 'xn--t9j.co',
		  type: 'AAAA',
		  content: '684d:1111:222:3333:4444:5555:6:77',
		  proxied: false,
			},
			{
		  id: '22bfae39722e0ffd988a38fd0359987b',
		  zone_name: 'xn--t9j.co',
		  name: '_sub.xn--t9j.co',
		  type: 'TXT',
		  content: 'some-key-verification=value ?huh -thats cool!',
		  proxied: false,
			},
			{
		  id: 'ee023820a9ee231a33aa33259b0ee8f5',
		  zone_name: 'xn--t9j.co',
		  name: 'xn--t9j.co',
		  type: 'TXT',
		  content: 'Something else',
		  proxied: false,
			},
		]

		const local: ConfigRecord[] = [
			{ type: 'A', name: 'mail', ipv4: '11.22.33.44' },
			{ type: 'A', name: '@', ipv4: '11.22.33.44', proxied: false },
			{ type: 'AAAA', name: 'mail', ipv6: '684D:1111:222:3333:4444:5555:6:77' },
			{ type: 'AAAA', name: '@', ipv6: '684D:1111:222:3333:4444:5555:6:77', proxied: false },
			{ type: 'TXT', name: '_sub', content: 'some-key-verification=value ?huh -thats cool!' },
			{ type: 'TXT', name: '@', content: 'Something else' },
		]

		const output = partitionRecords(remote, local, sameRecord)
		expect(output.toBeDeleted).toStrictEqual([])
		expect(output.toBeKept).toStrictEqual(remote)
		expect(output.toBeAdded).toStrictEqual([])
	})
})
