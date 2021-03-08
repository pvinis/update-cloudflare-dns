import { niceRecordName, printConfigRecord, printRemoteRecord, sameRecord } from "./helpers"
import { RemoteRecord } from "./types"


const mockRemoteRecord = (overrides: Partial<RemoteRecord>): RemoteRecord => {
	const initial: RemoteRecord = {
		id: "a-rec",
		type: "TXT",
		name: "wow.mydomain.com",
		zone_name: "mydomain.com",
		content: "pavlos",
		proxied: false,
	}
	return {...initial, ...overrides}
}


describe(niceRecordName, () => {
	it("works", () => {
		expect(niceRecordName(mockRemoteRecord({
			name: "wow.mydomain.com",
			zone_name: "mydomain.com"
		}))).toBe("wow")

		expect(niceRecordName(mockRemoteRecord({
			name: "mydomain.com",
			zone_name: "mydomain.com"
		}))).toBe("@")

		expect(niceRecordName(mockRemoteRecord({
			name: "*.mydomain.com",
			zone_name: "mydomain.com"
		}))).toBe("*")
	})
})


describe(sameRecord, () => {
	it("works", () => {
		expect(sameRecord(mockRemoteRecord({type: "A"}), {type: "TXT", name: "wow", content: "pavlos"})).toBe(false)

		expect(sameRecord(
			mockRemoteRecord({type: "A", content: "11.22.33.44"}),
			{type: "A", name: "wow", ipv4: "11.22.33.44"}
		)).toBe(true)

		expect(sameRecord(
			mockRemoteRecord({type: "A", content: "11.22.33.44", proxied: false,}),
			{type: "A", name: "wow", ipv4: "11.22.33.44", proxied: false}
		)).toBe(true)

		expect(sameRecord(
			mockRemoteRecord({type: "A", content: "11.22.33.44", proxied: true,}),
			{type: "A", name: "wow", ipv4: "11.22.33.44", proxied: false}
		)).toBe(false)
	})
})


describe(printRemoteRecord, () => {
	it("works", () => {
		expect(printRemoteRecord(mockRemoteRecord({
			type: "A",
			name: "mail.mydomain.com",
			content: "11.22.33.44",
		})))
		.toBe("mail	1	IN	A	11.22.33.44")
		expect(printRemoteRecord(mockRemoteRecord({
			type: "A",
			name: "mydomain.com",
			content: "11.22.33.44",
		})))
		.toBe("@	1	IN	A	11.22.33.44")
	})

	it("also prints in full", () => {
		expect(printRemoteRecord(mockRemoteRecord({
			type: "A",
			name: "mail.mydomain.com",
			content: "11.22.33.44",
		}), true))
		.toBe("mail.mydomain.com.	1	IN	A	11.22.33.44")
		expect(printRemoteRecord(mockRemoteRecord({
			type: "A",
			name: "mydomain.com",
			content: "11.22.33.44",
		}), true))
		.toBe("mydomain.com.	1	IN	A	11.22.33.44")
	})
})

describe(printConfigRecord, () => {
	it("works", () => {
		expect(printConfigRecord({
			type: "A",
			name: "mail",
			ipv4: "11.22.33.44",
		}, "mydomain.com"))
		.toBe("mail	1	IN	A	11.22.33.44")
		expect(printConfigRecord({
			type: "A",
			name: "@",
			ipv4: "11.22.33.44",
		}, "mydomain.com"))
		.toBe("@	1	IN	A	11.22.33.44")
		expect(printConfigRecord({
			type: "TXT",
			name: "@",
			content: "wow=pavlos",
		}, "mydomain.com"))
		.toBe('@	1	IN	TXT	"wow=pavlos"')
	})

	it("also prints in full", () => {
		expect(printConfigRecord({
			type: "A",
			name: "mail",
			ipv4: "11.22.33.44",
		}, "mydomain.com", true))
		.toBe("mail.mydomain.com.	1	IN	A	11.22.33.44")
		expect(printConfigRecord({
			type: "A",
			name: "@",
			ipv4: "11.22.33.44",
		}, "mydomain.com", true))
		.toBe("mydomain.com.	1	IN	A	11.22.33.44")
	})
})
