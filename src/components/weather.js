import React from "react";
import "../styles/weather.css";
import axios from "axios"
import WeatherDay from "./weatherDay"
import moment from 'moment-timezone'
moment.locale('ru')

function weather(props){
    
    let [isLoading, setLoading] = React.useState(true)
    let [dict, setDict] = React.useState(new Object)
    let [days5, setDays5] = React.useState(new Object)
    let [nowdayincity, setNowdayincity] = React.useState(0)

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
            
            let dtz = respforecast.data["city"]["timezone"]/3600
            nowdayincity = moment.utc(new Date(resptime.data['datetime'])).utcOffset(convertOffset(dtz))
            console.log(nowdayincity)
            days5[nowdayincity.date()] = {0: nowweather}
            let forecastkey=0
            
            respforecast.data['list'].map((el)=>{
                let datestr = (el["dt_txt"].replace(" ","T")+"Z")// время UTC )
                let datetime =  moment.utc(new Date(datestr)).utcOffset(convertOffset(dtz))
                let prognoz = {
                    temp: Math.round(el["main"]["temp"]-273.15)+" °C",
                    windspeed: Math.round(el["wind"]["speed"]),
                    winddirection: degToCompass(el["wind"]["deg"]),
                    pressure: Math.round(el["main"]["pressure"]* 0.750062),
                    humidity: el["main"]["humidity"],
                    clouds: el["clouds"]["all"],
                    forecastkey: forecastkey,
                    datetime: datetime
                }
                if (datetime.date() in days5){
                    days5[datetime.date()][datetime.hours()] = prognoz
                }
                else{
                    days5[datetime.date()] = {[datetime.hours()]: prognoz}
                } 
                forecastkey+=1
                return datetime
            })
            moment.locale = ('ru')
            nowdayincity = moment.utc(new Date(resptime.data['datetime'])).utcOffset(convertOffset(dtz))
            console.log(nowdayincity)
            setNowdayincity(nowdayincity)
            console.log(days5)
            console.log(Object.keys(days5).toString())
            setDict({now: nowweather})
            setLoading(false)
        })
    }, [])
    if (isLoading){
        return(<p>Загрузка...</p>)
    }
    return(
        <>
            <p>Текущее время: {nowdayincity.date()+"/" + nowdayincity.month()+"/"+nowdayincity.year()+" "+nowdayincity.hours()+":"+nowdayincity.minutes()+" UTC"+convertOffset(nowdayincity.utcOffset()/60)}</p>
            {(Object.keys(days5).map(dayel=>{
                return(<WeatherDay key={dayel} day={dayel} data={days5[dayel]} firstdate={(nowdayincity.date()==dayel) }></WeatherDay>)
            }))}
        </>
    )
}
export default weather