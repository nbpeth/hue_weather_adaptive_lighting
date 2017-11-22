const axios = require('axios');
const color_profiles = require('./color_profiles.js');
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

const get_weather = () => {
	axios.get(config['dark_sky_base_url'] + "/" + config['dark_sky_key'] + "/" + config['lat_long'])
		.then(response => {
			set_hue_state(response.data);
		})
		.catch(error => {
			console.log(error);
		});	
}

const set_hue_state = (weather_state) => {
	axios({
		method:'put',
		url: [config['hue_url'],config['hue_user'],'groups/1/action'].join("/"),
		data: color_profiles(weather_state)

	})
	.then(response => {
			console.log(response.data);
		})
	.catch(error => {
		console.log(error);
	});	
}

const run = () => {
	get_weather();
}

run();


