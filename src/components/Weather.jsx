import React from "react";
import './Weather.css'
import { useState } from "react";
import icons from "./Icons";

const apiKey = import.meta.env.VITE_APP_API_KEY

const api = {
    key: apiKey,
    baseURL: "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    const [query, setQuery] = useState("")
    const [weather, setWeather] = useState({})

    const printVal = (input) => {
        setQuery(input)
    }

    const search = (evt) => {
        if(evt.key === "Enter") {
            fetch(`${api.baseURL}weather?q=${query}&units=metric&appid=${api.key}`)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Network response was not ok")
                }
                return response.json()
            })
            .then(data => {
                setWeather(data)
                setQuery('')
            })
        }
        console.log(weather)
    }

    const dateBuilder = (Date) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        let day = days[Date.getDay()]
        let date = Date.getDate()
        let month = months[Date.getMonth()]
        let year = Date.getFullYear()

        return `${day}, ${date} ${month} ${year}`
    }

    const getTempClass = (temp) => {
        if (temp > 30) {
            return 'warm'
        } else if (temp > 20 && temp <= 30) {
            return 'spring'
        } else if (temp <= 20) {
            return 'cool'
        } else {
            return 'stock'
        }
    }

    return(
        <div className={(typeof weather.main != "undefined")? 
                        getTempClass(weather.main.temp) : 'stock'}> 
            <div className="search-box">
                <input type="text"  
                    className="search-bar"
                    placeholder="Search..." 
                    value={query}
                    onChange={(e) => printVal(e.target.value)}
                    onKeyPress={search}/>
            </div>

            <div className="location-box">
                {(typeof weather.main != "undefined")? (
                    <div className="location">
                        <div className="more-details">
                            <span><img src={icons.tempIcon} alt="" />Max temperature: {weather.main.temp_max}°C</span>
                            <span><img src={icons.tempIcon} alt="" />Min temperature: {weather.main.temp_min}°C</span>
                            <span><img src={icons.humidityIcon} alt="" />Humidity: {weather.main.humidity}%</span>
                        </div>

                        <div>
                            <div className="country-div">
                                <h1 className="country">{weather.name}, {weather.sys.country}</h1>
                                <p>{dateBuilder(new Date())}</p>
                            </div>

                            <div className="box">
                                <img src={icons.weatherIcon} alt="" className="weather-img"/>
                                <h1>{Math.round(weather.main.temp)}°C</h1>
                                <p>Feels like {Math.round(weather.main.feels_like)}°C</p>
                            </div>

                            <div className="description-div">
                                <p>{weather.weather[0].main}</p>
                            </div>
                        </div>

                        <div className="more-details">
                            <span><img src={icons.pressureIcon} alt="" />Pressure: {weather.main.pressure}hPa</span>
                            <span><img src={icons.seaLevelIcon} alt="" />Sea level: {weather.main.sea_level}hPa</span>
                            <span><img src={icons.windIcon} alt="" />Wind Speed: {weather.wind.speed}m/s</span>
                            <span><img src={icons.windIcon} alt="" />Wind Degree: {weather.wind.deg}°</span>
                        </div>
                    </div>
                ) : (
                    <div className="location">
                        <div className="empty">
                            <img src={icons.weatherIcon} alt="" />
                            <p>Type a city name and press Enter to get the weather!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Weather;