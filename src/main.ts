
require('dotenv').config()


const main = async () => {
	const ZONE = core.getInput('zone')

	const DRY_RUN: boolean = Boolean(process.env.DRY_RUN ?? 'false')

	const TOKEN = process.env.CLOUDFLARE_TOKEN
	if (TOKEN === undefined) {
		console.log("Cloudflare token not found. Make sure to add one in GitHub environments.")
		core.setFailed("Cloudflare token not found.")
		exit(-1)
	}

	const cf = new Cloudflare({
		token: TOKEN
	})


	const rawText = fs.readFileSync("./DNS-RECORDS.hjson").toString()
	const config: Config = HJSON.parse(rawText)


	interface Zone { name: string, id: string }
	// Find the right zone
	const zones: Zone[] = ((await cf.zones.browse()) as any).result
	const theZones = zones.filter(zone => zone.name === ZONE).map(zone => zone.id)
	if (theZones.length === 0) {
		console.log(`No zones found with name: ${ZONE}.`)
		console.log("Make sure you have it right in DNS-RECORDS.hjson.")
		core.setFailed("Zone not found.")
		exit(-1)
	}

	const zoneId = theZones[0]

	// Check which records need to be deleted, kept, or added
	const currentRecords: RemoteRecord[] = ((await cf.dnsRecords.browse(zoneId)) as any).result

	const toBeDeleted: RemoteRecord[] = []
	const toBeKept: RemoteRecord[] = []
	const toBeAdded: ConfigRecord[] = config.records

	currentRecords.forEach(rec => {
	})

	console.log("Records that will be deleted:")
	toBeDeleted.forEach(rec => {
		console.log("- ", printRemoteRecord(rec))
	})

	if (!DRY_RUN) {
		toBeDeleted.forEach(rec => {
			cf.dnsRecords.del(zoneId, rec.id)
		})
	}

	console.log("Records that will be kept:")
	toBeKept.forEach(rec => {
		console.log("- ", printRemoteRecord(rec))
	})

	console.log("Records that will be added:")
	toBeAdded.forEach(rec => {
		console.log("- ", printConfigRecord(rec, ZONE))
	})

	if (!DRY_RUN) {
		toBeAdded.forEach(rec => {
			const content = recordContent(rec)
			switch (rec.type) {
				case "A":
				case "AAAA":
					cf.dnsRecords.add(zoneId, {
						type: rec.type,
						name: rec.name,
						content,
						proxied: rec.proxied ?? true,
					})
					break


				case "TXT":
					cf.dnsRecords.add(zoneId, {
						type: rec.type,
						name: rec.name,
						content,
					})
					break


				default: absurd(rec)
			}
		})
	}



}
main()

