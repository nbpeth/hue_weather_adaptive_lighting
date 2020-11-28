const axios = require('axios');
const colorProfiles = require('./color_profiles.js');
const config = require('./config.js');

// const get_hue_state = () => {
// 	axios.get(config['hue_url'] + '/groups')
// 		.then(response => {
// 			console.log(response.data);
// 		})
// 		.catch(error => {
// 			console.log(error);
// 		});	
// }

const buildDarkSkyURL = (config) => `${config['dark_sky_base_url']}/${config['dark_sky_key']}/${config['lat_long']}`
const buildHueUrl = (config, resource="groups", id=1) => {
	return `http://${config['hue_url']}/api/${config['hue_user']}/${resource}/${id}/action`// get group to affect	
}
	

const getWeather = () => {
	axios.get(buildDarkSkyURL(config))
		.then(response => {
			console.log("Got weather")
			setHueState(response.data);
		})
		.catch(error => {
			console.error(error);
		});	
}

const setHueState = (weather_state) => {
	console.log("Setting state", colorProfiles(weather_state))
	axios({
		method:'put',
		url: buildHueUrl(config),
		data: colorProfiles(weather_state)

	})
	.then(response => {
			console.log("state set", response.data);
		})
	.catch(error => {
		console.error(error);
	});	
}

module.exports = getWeather

// 
// URL	/api
// Body	{"devicetype":"name#device"}
// Method	POST
// 