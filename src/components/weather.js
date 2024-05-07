import React from "react";
import "../styles/app.css";
import axios from "axios"
import WeatherNow from "./weatherNow"
import ForecastWeather from "./forecastWeather";

function weather(props){
    
    let [isLoading, setLoading] = React.useState(true)
    let [dict, setDict] = React.useState(new Object)

    function degToCompass(num){
        let arr=["С","СВ","В", "ЮВ","Ю","ЮЗ","З","СЗ"]
        return arr[Math.floor(num/45)+Math.floor(num%45/22.5)]
    }
    function getCurrentWeather(){
        return axios.get(`https://api.openweathermap.org/data/2.5/weather`,{
            params:{
                lat: props.coord["lat"],
                lon: props.coord["lon"],
                appid: "ca41b2393b99c2028ee6b134000ddab8"
            }
        })
    }
    function getForecast(){
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast`,{
            params:{
                lat: props.coord["lat"],
                lon: props.coord["lon"],
                appid: "ca41b2393b99c2028ee6b134000ddab8"
            }
        })
    }
    React.useEffect(()=>{
        Promise.all([getCurrentWeather(), getForecast()])
        .then(([respweather, respforecast])=>{
            let nowweather = {
                temp: Math.round(respweather.data["main"]["temp"]-273.15)+" °C",
                windspeed: Math.round(respweather.data["wind"]["speed"]),
                winddirection: degToCompass(respweather.data["wind"]["deg"]),
                pressure: Math.round(respweather.data["main"]["pressure"] * 0.750062),
                humidity: respweather.data["main"]["humidity"],
                clouds: respweather.data["clouds"]["all"]
            }
            let forecast = respforecast.data['list'].map((el)=>{
                console.log(new Date(el["dt_txt"]+respforecast.data["city"]["timezone"]))
            })
            console.log(forecast)
            setDict({now: nowweather})
            setLoading(false)
        })
       
    }, [])
    if (isLoading){
        return(<p>Загрузка...</p>)
    }
    return(
        <>
            <WeatherNow dict={dict["now"]}></WeatherNow>
        </>
    )
}
export default weather