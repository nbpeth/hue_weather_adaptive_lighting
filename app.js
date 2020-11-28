const getWeather = require('./weatherService')
const config = require('./config')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 async function run() {
	while(true) {
		await sleep(config.fetch_interval_seconds * 1000);
		console.log("getting weather...");
		getWeather();
	}
}

run();