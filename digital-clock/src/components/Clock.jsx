// src/components/Clock.jsx
import { useEffect, useState } from "react";
import "./../styles/clock.css";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [unit, setUnit] = useState("F");

  useEffect(() => {
  if (time.getMinutes() === 0 && time.getSeconds() === 0) {
    new Audio("/beep.mp3").play();
  }
}, [time]);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  //  Fetch weather (OpenWeatherMap or similar)
  useEffect(() => {
    async function fetchTemp() {
      const apiKey = "0315e4cf4897f6e6071f1c1987e399e4";
      const city = "New York"; // change to your city
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
      );
      const data = await res.json();
      setTemperature(data.main.temp);
    }

    fetchTemp();
  }, []);

  // Toggle 12/24hr
  const formatTime = () => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    if (!is24Hour) {
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
    }

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const pad = (num) => String(num).padStart(2, "0");

  const displayTemp = () => {
    if (!temperature) return "...";
    return unit === "F"
      ? `${Math.round(temperature)} °F`
      : `${Math.round(((temperature - 32) * 5) / 9)} °C`;
  };

  return (
    <div className="clock-container">
      <h1 className="time">{formatTime()}</h1>
      <button onClick={() => setIs24Hour((prev) => !prev)}>
        Toggle {is24Hour ? "12hr" : "24hr"}
      </button>
      <div className="temperature">
        <p>Temp: {displayTemp()}</p>
        <button onClick={() => setUnit(unit === "F" ? "C" : "F")}>
          °{unit === "F" ? "C" : "F"}
        </button>
      </div>
    </div>
  );
}
