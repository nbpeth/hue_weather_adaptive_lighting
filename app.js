const axios = require('axios');
const color_profiles = require('./color_profiles.js');
const config = require('./config.js');

const getHueState = () => {
	axios.get(config['hue_url'] + '/groups')
		.then(response => {
			console.log(response.data);
		})
		.catch(error => {
			console.log(error);
		});	
}

const getWeather = () => {
	axios.get(config['dark_sky_base_url'] + '37.8267,-122.4233')
		.then(response => {
			var data = response.data;
			var current_weather = data['currently'];
			var current_weather_state = current_weather['icon'];

			changeLights(current_weather_state);
		})
		.catch(error => {
			console.log(error);
		});	
}

const changeLights = (weather_state) => {
	axios({
		method:'put',
		url: config['hue_url'] + config['hue_user'] + '/groups/1/action',
		data: color_profiles[weather_state]

	})
	.catch(error => {
		console.log(error);
	});	
}

changeLights('rain');

// getWeather();

