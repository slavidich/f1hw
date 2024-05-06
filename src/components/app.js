import React from "react";
import "../styles/app.css";
import CurrentWeather from "./currentWeather"
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
    return (
    <div>
        <Weather/>
    </div>
    );
}

export default App;