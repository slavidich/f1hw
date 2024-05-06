import React from "react";
import "../styles/currentWeather.css";
import axios from "axios"

function currentWeather(props){
    let [isLoading, setLoading] = React.useState(true)
    let [dict, setDict] = React.useState(new Object)

    function degToCompass(num){
        let arr=["С","СВ","В", "ЮВ","Ю","ЮЗ","З","СЗ"]
        return arr[Math.floor(num/45)+Math.floor(num%45/22.5)]
    }
    
    React.useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.coord["lat"]}&lon=${props.coord["lon"]}&appid=ca41b2393b99c2028ee6b134000ddab8`)
        .then(resp=>{
            setDict({
                temp: Math.round(resp.data["main"]["temp"]-273.15)+" °C",
                windspeed: Math.round(resp.data["wind"]["speed"]),
                winddirection: degToCompass(resp.data["wind"]["deg"]),
                pressure: Math.round(resp.data["main"]["pressure"] * 0.750062),
                humidity: resp.data["main"]["humidity"],
                clouds: resp.data["clouds"]["all"]
            })
            setLoading(false)
        })
    }, [])
    if (isLoading){
        return(<p>Загрузка...</p>)
    }
    return(
        <div>
            <p>Текущая температура: {dict["temp"]}</p>
            <p>Ветер: {dict["windspeed"]} м/c {(dict["winddirection"])}</p>
            <p>Давление: {dict["pressure"]} мм рт.ст.</p>
            <p>Влажность: {dict["humidity"]}%</p>
            <p>Облачность: {dict["clouds"]}%</p>
        </div>
    )
}

export default currentWeather

