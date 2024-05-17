async function moduleProject4() {

    // 👇 WORK WORK BELOW THIS LINE 👇
    const footer = document.querySelector('footer')
    const currentYear = new Date().getFullYear()
    footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

    let descriptions = [
        ["Sunny", "☀️"],
        ["Cloudy", "☁️"],
        ["Rainy", "🌧️"],
        ["Thunderstorm", "⛈️"],
        ["Snowy", "❄️"],
        ["Partly Cloudy", "⛅️"]
    ]

    // 👉 Tasks 1 - 5 go here
    // init vars
    const citySelect = document.querySelector('select#citySelect')
    const pInfo = document.querySelector('p.info')
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const today_apparentTemp = document.querySelector('#apparentTemp > div:nth-child(2)')
    const today_symbol = document.querySelector('#todayDescription')
    const [today_lowHigh, today_precip, today_humidity, today_wind] = document.querySelector('#todayStats').children
    let nextDayPointers = []
    Array.from(document.querySelector('#forecast').children).forEach(div => {
        const [weekday, symbol, lowHigh, precip] = div.children
        nextDayPointers.push({ weekday, symbol, lowHigh, precip })
    })
    const [divCity, divCountry] = document.querySelector('#location').children
    const weatherWgt = document.querySelector('div#weatherWidget')

    // producer functions
    const getWeekday = dateStr => {
        let date = new Date(dateStr)
        let weekdayIdx = date.getDay()
        return weekdays[weekdayIdx]
    }
    const getSymbol = descStr => {
        let desc = descriptions.find(d => d[0] === descStr)
        return desc[1]
    }

    // 👉 Task 1
    weatherWgt.style.display = 'none'

    // 👉 Task 2
    citySelect.addEventListener('change', evt => {
        // 👉 Task 3
        weatherWgt.style.display = 'none'
        citySelect.disabled = true
        pInfo.textContent = "Fetching weather data..."

        // 👉 Task 4
        let reqUrl = `http://localhost:3003/api/weather?city=${evt.target.value}`
        axios.get(reqUrl)
            .then(res => {
                // 👉 Task 5
                pInfo.textContent = ""
                citySelect.disabled = false
                weatherWgt.style.display = 'block'
                let data = res.data
                // populate current
                let { apparent_temperature: temp,
                    weather_description: desc,
                    temperature_max: high,
                    temperature_min: low,
                    humidity: humid,
                    wind_speed: wind,
                    precipitation_probability: precip } = data.current
                today_apparentTemp.textContent = `${temp}°`
                today_symbol.textContent = getSymbol(desc)
                today_lowHigh.textContent = `${low}°/${high}°`
                today_precip.textContent = `Precipitation: ${precip * 100}%`
                today_humidity.textContent = `Humidity: ${humid}%`
                today_wind.textContent = `Wind: ${wind}m/s`
                // populate forecast
                nextDayPointers.forEach(({ weekday, symbol, lowHigh, precip: divPrecip }, idx) => {
                    let { date,
                        weather_description: desc,
                        temperature_min: low,
                        temperature_max: high,
                        precipitation_probability: precip } = data.forecast.daily[idx]
                    weekday.textContent = getWeekday(date)
                    symbol.textContent = getSymbol(desc)
                    lowHigh.textContent = `${low}°/${high}°`
                    divPrecip.textContent = `Precipitation: ${precip * 100}%`
                })
                // populate city/country
                let { city, country } = data.location
                divCity.textContent = city
                divCountry.textContent = country
            })
            .catch(err => {
                console.error(err.message)
            })
    })


    // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
