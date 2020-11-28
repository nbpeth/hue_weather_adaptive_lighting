const determine_brightness = (today) => {
	var sunrise = today['sunriseTime'] * 1000;
	var sunset = today['sunsetTime'] * 1000;

	var now = new Date().getTime();
	var day_light_today = (sunset - sunrise);
	var time_elapsed = (now - sunrise);
	var noon = day_light_today / 2;

	var brightness = 0;

	if(time_elapsed <= noon) { // get dimmer
		brightness = (1 - (time_elapsed/noon)) * 255;
	}
	else{
		brightness = (time_elapsed/sunset) * 255;
		brightness = brightness >= 255 ? 255 : brightness
	}
	return Math.round(brightness);
}

const color_profiles = (weather_state) => {
	var today = weather_state['daily']['data'][0];
	var current_condition = weather_state['currently']['icon'];

	return {
		'hue':color_map(current_condition)['hue'],
		'bri':determine_brightness(today),
		'sat':color_map(current_condition)['sat']
	}
}

const random = (ceil=60000) => Math.floor(Math.random() * ceil);

const color_map = (current_condition) => {
	console.log("currently..", current_condition)
	return {
		'clear-day':{
			'hue':random(),
			'sat':random(100),
			'bri':random(100)
		}, 
		'clear-night':{
			'hue':random(),
			'sat':100,
			'bri':random(100)
		}, 
		'rain':{
			'hue':random(),
			'sat':100,
			'bri':random(100)
		}, 
		'snow':{
			'hue':random(),
			'sat':100,
			'bri':random(100)
		}, 
		'sleet':{
			'hue':random(),
			'sat':100,
			'bri':random(100)
		},  
		'wind':{
			'hue':random(),
			'sat':100,
			'bri':random(100)
		},  
		'fog':{
			'hue':random(),
			'sat':100,
			'bri':random(100)
		}, 
		'cloudy':{
			'hue':random(),
			'sat':100,
			'bri':random(100)
		}, 
		'partly-cloudy-day':{
			'hue':random(),
			'sat':100,
			'bri':random(100)
		}, 
		'partly-cloudy-night':{
			'hue':random(),
			'sat':100,
			'bri':random(100)
		}, 
		'hail':{
			'hue':10000,
			'sat':100,
			'bri':random(100)
		}, 
		'thunderstorm':{
			'hue':10000,
			'sat':100,
			'bri':random(100)
		}, 
		'tornado':{
			'hue':10000,
			'sat':100,
			'bri':random(100)
		}, 
	}[current_condition]
}

/*
{ time: 1511244000,
  summary: 'Partly cloudy until afternoon.',
  icon: 'partly-cloudy-day',
  sunriseTime: 1511269246,
  sunsetTime: 1511304799,
  moonPhase: 0.1,
  precipIntensity: 0,
  precipIntensityMax: 0.0001,
  precipIntensityMaxTime: 1511308800,
  precipProbability: 0,
  temperatureHigh: 51.37,
  temperatureHighTime: 1511287200,
  temperatureLow: 23.37,
  temperatureLowTime: 1511352000,
  apparentTemperatureHigh: 51.37,
  apparentTemperatureHighTime: 1511287200,
  apparentTemperatureLow: 18.07,
  apparentTemperatureLowTime: 1511352000,
  dewPoint: 26.84,
  humidity: 0.52,
  pressure: 1016.67,
  windSpeed: 3.69,
  windGust: 23.45,
  windGustTime: 1511312400,
  windBearing: 331,
  cloudCover: 0.13,
  uvIndex: 2,
  uvIndexTime: 1511283600,
  visibility: 10,
  ozone: 288.97,
  temperatureMin: 28.62,
  temperatureMinTime: 1511326800,
  temperatureMax: 51.37,
  temperatureMaxTime: 1511287200,
  apparentTemperatureMin: 21.43,
  apparentTemperatureMinTime: 1511326800,
  apparentTemperatureMax: 51.37,
  apparentTemperatureMaxTime: 1511287200 }
*/


module.exports = color_profiles;