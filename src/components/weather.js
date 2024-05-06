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
    let [city, setCity] = React.useState(Object.keys(cities)[0])
    let [spinner, setSpinner] = React.useState(false); 

    function changeSelect(e){
        let city = e.target.value
        setCity(city)
    }
    return(
        <>
        <p>Выберите город:</p>
        <select onChange={changeSelect}>
            {Object.keys(cities).map(el=>{
                return (<option key={el} value={el}>{el}</option>)
            })}
        </select>
        <CurrentWeather key={city} coord={cities[city]}/>
        </>
    )
}
export default weather