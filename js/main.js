import { parse } from 'yaml'

import App from "./App"

window.addEventListener("DOMContentLoaded", async () => {
	try {
		let response = await fetch("config/config.json")
		let config = {}

		if (response.status === 200) {
			config = await response.json()
			window.app = new App(config)
		} else if (response.status === 404) {
			response = await fetch("config/config.yaml")
			config = parse(await response.text())
			window.app = new App(config)
		} else {
			console.error("Failed to fetch config file:", response.status)
		}
	} catch (e) {
		console.error("Failed to parse config file:")
		throw e;
	}
})
