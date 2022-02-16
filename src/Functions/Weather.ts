import fetch from 'node-fetch'

// https://www.weatherapi.com/api-explorer.aspx

export async function GetWeather() {
	const BASEURL = `https://api.weatherapi.com/v1/forecast.json?`
	const KEY = `key=${process.env.WEATHER_KEY}`
	const LOCATION = `&q=Gilbert`
	const CONFIG = '&days=1&aqi=no&alerts=no'
	const url = `${BASEURL}${KEY}${LOCATION}${CONFIG}`

	const response = await fetch(url)
	const res: any = await response.json()

	const forecast = res.forecast.forecastday[0]
	const hour = res.forecast.forecastday[0].hour.find(hour => {
		return hour.time_epoch > res.location.localtime_epoch
	})

	const description = hour.condition.text.toString()
	const temperature = Math.floor(hour.temp_f).toString() + '°'
	const humidity = hour.humidity.toString() + ' %'
	const rain = Math.ceil(hour.precip_in).toString() + ' %'
	const clouds = Math.ceil(hour.cloud).toString() + ' %'
	const max = Math.ceil(forecast.day.maxtemp_f).toString() + '°'
	const min = Math.floor(forecast.day.mintemp_f).toString() + '°'
	const windSpeed = hour.wind_mph.toFixed(1).toString() + ' mph'
	const windGust = hour.gust_mph.toFixed(1).toString() + ' mph'
	const sunrise = TrimLeadingZero(forecast.astro.sunrise).toString()
	const sunset = TrimLeadingZero(forecast.astro.sunset).toString()
	const icon = hour.condition.icon

	return {
		loading: false,
		description, temperature,
		icon, max, min,
		humidity, rain, clouds,
		windSpeed, windGust,
		sunrise, sunset
	}
}

function TrimLeadingZero(timeString: string) {
	const splitTime = timeString.split(':')

	return `${parseInt(splitTime[0])}:${splitTime[1]}`
}
