import React from "react";
import "../styles/app.css";
import axios from "axios"
import WeatherNow from "./weatherNow"
import moment from 'moment-timezone'



function weather(props){
    
    let [isLoading, setLoading] = React.useState(true)
    let [dict, setDict] = React.useState(new Object)

    function degToCompass(num){
        let arr=["С","СВ","В", "ЮВ","Ю","ЮЗ","З","СЗ"]
        return arr[Math.floor(num/45)+Math.floor(num%45/22.5)]
    }
    function convertOffset(gmt_offset) {
        var time = gmt_offset.toString().split(".");
        var hour = parseInt(time[0]);
        var negative = hour < 0 ? true : false;
        hour = Math.abs(hour) < 10 ? "0" + Math.abs(hour) : Math.abs(hour);
        hour = negative ? "-" + hour : "+" + hour;
        return time[1] ? hour+(time[1]*6).toString() : hour + "00";
    }
    function getCurrentTime(){
        return axios.get(`http://worldtimeapi.org/api/timezone/Etc/UTC`)
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
        Promise.all([getCurrentWeather(), getForecast(), getCurrentTime()])
        .then(([respweather, respforecast, resptime])=>{
            let nowweather = {
                temp: Math.round(respweather.data["main"]["temp"]-273.15)+" °C",
                windspeed: Math.round(respweather.data["wind"]["speed"]),
                winddirection: degToCompass(respweather.data["wind"]["deg"]),
                pressure: Math.round(respweather.data["main"]["pressure"] * 0.750062),
                humidity: respweather.data["main"]["humidity"],
                clouds: respweather.data["clouds"]["all"]
            }
            let dtz = 0
            let forecast = respforecast.data['list'].map((el)=>{
                dtz = respforecast.data["city"]["timezone"]/3600
                let datestr = (el["dt_txt"].replace(" ","T")+"Z")// время UTC )
                let datetime =  moment.utc(new Date(datestr)).utcOffset(convertOffset(dtz))
                return datetime 
            })
            let nowdayincity = moment.utc(new Date(resptime.data['datetime'])).utcOffset(convertOffset(dtz)).date()
            let days5 = new Object()
            forecast.forEach((el)=>{
                (el.date() in days5)?days5[el.date()].push(el): days5[el.date()] = new Array(el)
            })
            console.log(days5)
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