import { useEffect, useState } from "react";
import "./App.css";

const beepSound = new Audio("/beep.mp3");

export default function App() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [unit, setUnit] = useState("F");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date();

      // 🕐 Top of the hour
      if (newTime.getMinutes() === 0 && newTime.getSeconds() === 0) {
        beepSound.play().catch((err) =>
          console.warn("Auto-play blocked:", err)
        );
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1500);
      }

      setTime(newTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🌡 Fetch weather
  useEffect(() => {
    async function fetchWeather() {
      const apiKey = "0315e4cf4897f6e6071f1c1987e399e4";
      const city = "New York";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
      );
      const data = await res.json();
      setTemperature(data.main.temp);
    }

    fetchWeather();
  }, []);

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
    if (temperature === null) return "...";
    return unit === "F"
      ? `${Math.round(temperature)} °F`
      : `${Math.round(((temperature - 32) * 5) / 9)} °C`;
  };

  return (
    <div className="clock-container">
      
      <h1 className={`clock-time ${isAnimating ? "animate-hour" : ""}`}>
        {formatTime()}
      </h1>
      <button className="clock-btn" onClick={() => setIs24Hour(!is24Hour)}>
        Toggle {is24Hour ? "12hr" : "24hr"}
      </button>
      <div className="clock-temp">
        <p>Temperature: {displayTemp()}</p>
        <button
          className="clock-btn"
          onClick={() => setUnit(unit === "F" ? "C" : "F")}
        >
          Switch to °{unit === "F" ? "C" : "F"}
        </button>
 <button
  className="clock-btn"
  onClick={() => {
    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1500);

    // Play beep
    beepSound.play().catch((err) =>
      console.warn("Auto-play blocked:", err)
    );
  }}
>
  (Test) Sound Hourly
</button>


      </div>
    </div>
  );
}
