import React from "react";
import "../styles/app.css";
import Weather from "./weather"
//https://api.openweathermap.org/data/2.5/weather?lat=61.15&lon=73.26&appid=ca41b2393b99c2028ee6b134000ddab8
//http://api.openweathermap.org/data/2.5/forecast?lat=61.15&lon=73.26&appid=ca41b2393b99c2028ee6b134000ddab8

// https://api.openweathermap.org/data/2.5/weather?lat=61.15&lon=73.26&appid=ca41b2393b99c2028ee6b134000ddab8 Сургут
// https://api.openweathermap.org/data/2.5/weather?lat=55.4424&lon=37.3636&appid=ca41b2393b99c2028ee6b134000ddab8 Москва
// https://api.openweathermap.org/data/2.5/weather?lat=59.938480&lon=30.312480&appid=ca41b2393b99c2028ee6b134000ddab8 Спб
// https://api.openweathermap.org/data/2.5/weather?lat=43.115761&lon=131.885483&appid=ca41b2393b99c2028ee6b134000ddab8 Владивосток 
// https://api.openweathermap.org/data/2.5/weather?lat=40.741895&lon=-73.989308&appid=ca41b2393b99c2028ee6b134000ddab8 Нью-Йорк
// https://api.openweathermap.org/data/2.5/weather?lat=53.9024716&lon=27.56182258&appid=ca41b2393b99c2028ee6b134000ddab8 Минск

function App() {
    let cities = {
        Сургут: {lat: 61.15, lon: 73.26},
        Москва: {lat: 55.4424, lon: 37.3636},
        "Санкт-Петербург": {lat: 59.938480, lon: 30.312480},
        Владивосток: {lat: 43.115761, lon: 131.885483},
        "Нью-Йорк": {lat: 40.741895, lon: -73.989308},
        Минск: {lat: 53.9024716, lon: 27.5618225},
        Аделаида: {lat:-34.92, lon:138.59},
        Мидуэй: {lat:28.205, lon:-177.376},
        Хобарт: {lat:-42.8839, lon:147.324}
    }

    let [city, setCity] = React.useState(Object.keys(cities)[0])
    function changeSelect(e){
        let city = e.target.value
        setCity(city)
    }
    return(
        <div className="main">
            <div className="maindiv">
                <div className="selectdiv">
                <p>Выберите город:</p>
                    <select onChange={changeSelect}>
                        {Object.keys(cities).map(el=>{
                            return (<option key={el} value={el}>{el}</option>)
                        })}
                    </select>
                </div>
            <Weather key={city} coord={cities[city]} />
        </div>
        </div>
    )
}

export default App;