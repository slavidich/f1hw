import React from "react";
import "../styles/currentWeather.css";

function currentWeather(props){

    let currentweather = props.weather
    return (
        <div>
                <p>Текущая температура: {currentweather["temp"]}</p>
                <p>Ветер: {currentweather["windspeed"]} м/c {(currentweather["winddirection"])}</p>
                <p>Давление: {currentweather["pressure"]} мм рт.ст.</p>
                <p>Влажность: {currentweather["humidity"]}%</p>
                <p>Облачность: {currentweather["clouds"]}%</p>
        </div>
    )
}

export default currentWeather