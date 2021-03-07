const core = require('@actions/core')
const github = require('@actions/github')
const { exit } = require('process')
const HJSON = require("hjson")
const fs = require("fs")
const Cloudflare = require("cloudflare")

require('dotenv').config()


const main = async () => {
// try {
	const ZONE = core.getInput('zone')
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }


	const rawText = fs.readFileSync("./DNS-RECORDS.hjson").toString()
	const config = HJSON.parse(rawText)
	console.log(HJSON.stringify(config))


	// Find the right zone
	const zones = await cf.zones.browse()
	const theZones = zones.result.filter(zone => zone.name === ZONE).map(zone => zone.id)
	if (theZones.length === 0) {
		console.log(`No zones found with name: ${config.zone}`)
		console.log("Make sure you have it right in DNS-RECORDS.hjson")
		core.setFailed("Zone not found")
		exit(-1)
	}


	console.log("Records that will be deleted:")

	console.log("Records that will be kept:")
}
main()
