import React from "react";
import "../styles/app.css";
import axios from "axios"
import CurrentWeather from "./currentWeather"

function weather(props){
    let cities = {
        Сургут: {lat: 61.15, lon: 73.26},
        Москва: {lat: 55.4424, lon: 37.3636},
        "Санкт-Петербург": {lat: 59.938480, lon: 30.312480},
        Владивосток: {lat: 43.115761, lon: 131.885483},
        "Нью-Йорк": {lat: 40.741895, lon: -73.989308},
        Минск: {lat: 53.9024716, lon: 27.5618225}
    }
    
    let [currentweather, setCurrentWeather] = React.useState(new Object());
    let [spinner, setSpinner] = React.useState(true); 
    
    function degToCompass(num){
        let arr=["С","СВ","В", "ЮВ","Ю","ЮЗ","З","СЗ"]
        return arr[Math.floor(num/45)+Math.floor(num%45/22.5)]
    }

    async function getWeatherCity(city){
        let lat = cities[city]["lat"]
        let lon = cities[city]["lon"]
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ca41b2393b99c2028ee6b134000ddab8`)
            .then(resp=>{console.log(resp.data)
                let dict = {
                    temp: Math.round(resp.data["main"]["temp"]-273.15)+" °C",
                    windspeed: Math.round(resp.data["wind"]["speed"]),
                    winddirection: degToCompass(resp.data["wind"]["deg"]),
                    pressure: Math.round(resp.data["main"]["pressure"] * 0.750062),
                    humidity: resp.data["main"]["humidity"],
                    clouds: resp.data["clouds"]["all"]
                }
                setCurrentWeather(dict)
            })
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        await sleep(300)
        setSpinner(false)
    }
    async function changeSelect(e){
        setSpinner(true)
        let city = e.target.value
        await getWeatherCity(city)
    }
    if (!Object.keys(currentweather).length){ 
        getWeatherCity("Сургут") 
    }
    return(
        <>
        <p>Выберите город:</p>
        <select onChange={changeSelect}>
            {Object.keys(cities).map(el=>{
                return (<option key={el} value={el}>{el}</option>)
            })}
        </select>
        {spinner? 
            (<p>Загрузка...</p>): 
            (<CurrentWeather weather={currentweather}/>)}
        </>
    )
}
export default weather