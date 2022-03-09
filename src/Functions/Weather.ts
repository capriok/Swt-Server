import fetch from 'node-fetch'
import { format, parseISO } from 'date-fns'

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
	const currentHour = res.forecast.forecastday[0].hour.find(hour => {
		return hour.time_epoch > res.location.localtime_epoch
	})
	const dayHours = res.forecast.forecastday[0].hour.filter(hour => {
		const time = parseInt(format(parseISO(hour.time), 'k'))
		return (time >= 6 && time <= 22) && time % 2 === 0
	}).map(hour => ({
		time: format(parseISO(hour.time), 'h a'),
		temp: Math.ceil(hour.temp_f) + '°'
	}))

	const temperature = Math.floor(currentHour.temp_f).toString() + '°'
	const rain = Math.ceil(currentHour.precip_in).toString() + ' %'
	const clouds = Math.ceil(currentHour.cloud).toString() + ' %'
	const max = Math.ceil(forecast.day.maxtemp_f).toString() + '°'
	const min = Math.floor(forecast.day.mintemp_f).toString() + '°'
	const windSpeed = currentHour.wind_mph.toFixed(1).toString() + ' mph'
	const windGust = currentHour.gust_mph.toFixed(1).toString() + ' mph'
	const icon = currentHour.condition.icon

	return {
		current: {
			icon, temperature,
			max, min, rain, clouds,
			windSpeed, windGust
		},
		hours: dayHours
	}
}

function TrimLeadingZero(timeString: string) {
	const splitTime = timeString.split(':')

	return `${parseInt(splitTime[0])}:${splitTime[1]}`
}
