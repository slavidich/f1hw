import React from "react";
import "../styles/weatherDay.css";
import axios from "axios"

function weatherNow(props){
    if ("Сегодня" in props.data){
        
    }
    return(
        <div className="datediv">
            <p>{props.firstdate? "Сегодня ("+props.day+")": props.day}</p>
            <p></p>
            {(Object.keys(props.data)).map(el=>{
                
                return (
                    <div>
                        <p>{props.firstdate && (el==0)?"Сейчас":`На ${el.toString()}:00`}</p>
                        <p>Температура: {props.data[el]["temp"]}</p>
                        <p>Ветер : {props.data[el]["windspeed"]}м/c {(props.data[el]["winddirection"])}</p>
                        <p>Давление: {props.data[el]["pressure"]} рт.ст.</p>
                        <p>Влажность: {props.data[el]["humidity"]}%</p>
                        <p>Облачность: {props.data[el]["clouds"]}%</p>
                    </div>
                )
            })}
        </div>
    )
}

export default weatherNow

