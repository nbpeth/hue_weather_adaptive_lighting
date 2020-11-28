const getWeather = require('./weatherService')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 async function run() {
	while(true) {
		await sleep(5000);
		console.log("getting weather...");
		getWeather();
	}
}

run();