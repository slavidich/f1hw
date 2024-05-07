import React from "react";
import "../styles/currentWeather.css";
import axios from "axios"

function weatherNow(props){

    return(
        <div>
            
            <p>Текущая температура: {props.dict["temp"]}</p>
            <p>Ветер: {props.dict["windspeed"]} м/c {(props.dict["winddirection"])}</p>
            <p>Давление: {props.dict["pressure"]} мм рт.ст.</p>
            <p>Влажность: {props.dict["humidity"]}%</p>
            <p>Облачность: {props.dict["clouds"]}%</p>
        </div>
    )
}

export default weatherNow

