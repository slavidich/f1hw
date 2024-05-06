import React from "react";
import "../styles/app.css";
import axios from "axios"

function weather(props){
    let cities = {
        Сургут: {lat: 61.15, lon: 73.26},
        Москва: {lat: 55.4424, lon: 37.3636},
        "Санкт-Петербург": {lat: 59.938480, lon: 30.312480},
        Владивосток: {lat: 43.115761, lon: 131.885483},
        "Нью-Йорк": {lat: 40.741895, lon: -73.989308},
        Минск: {lat: 53.9024716, lon: 27.5618225}
    }
    //console.log(Object.keys(cities)) 
    // 273.15
    let [currentweather, setCurrentWeather] = React.useState(0)
    if (currentweather===0) setCurrentWeather("Сургут")
    function changeSelect(e){
        let lat = cities[e.target.value]["lat"]
        let lon = cities[e.target.value]["lon"]
        console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ca41b2393b99c2028ee6b134000ddab8`)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ca41b2393b99c2028ee6b134000ddab8`)
            .then(resp=>{console.log(resp.data)
                let dict = {
                    temp: resp.data["main"]["temp"]-273.15
                }
                setCurrentWeather(dict)
            }) 
        
    }
    return(
        <>
        <p>Выберите город:</p>
        <select onChange={changeSelect}>
            {Object.keys(cities).map(el=>{
                return (<option key={el} value={el}>{el}</option>)
            })}
        </select>
        <p>Текущая температура: {currentweather["temp"]}</p>
        </>
    )
}
export default weather