import React from "react";
import "../styles/weatherDay.css";
import axios from "axios"

function weatherNow(props){
    //<p>{props.data[Object.keys(props.data)[0]]["datetime"].toString()}</p>
    
    function month(){
        let firsth = Object.keys(props.data)[0]
        let date = props.data[firsth]["datetime"]
        console.log(date.month())
        return date.month()
    }
    return(
        <div className="datediv">
            <div className="date"><p>{props.firstdate? "Сегодня "+props.day+"/"+ (month()) +"": "Погода на " + props.day+"/"+month()}</p></div>

            <div className="tableweather">
            {(Object.keys(props.data)).map(el=>{
                console.log(props.data)
                return (
                    
                        <div className="hourdiv">
                            <p>{props.firstdate && (el==0)?"Сейчас":`На ${el.toString()}:00`}</p>
                            <p>Температура: {props.data[el]["temp"]}</p>
                            <p>Ветер : {props.data[el]["windspeed"]}м/c {(props.data[el]["winddirection"])}</p>
                            <p>Давление: {props.data[el]["pressure"]} рт.ст.</p>
                            <p>Влажность: {props.data[el]["humidity"]}%</p>
                            <p>Облачность: {props.data[el]["clouds"]}%</p>
                        </div>
                    
                )
            })}</div>
        </div>
    )
}

export default weatherNow

