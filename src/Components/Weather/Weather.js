import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./style.css";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { REACT_APP_WEATHER_KEY } = process.env;
const Weather = () => {
  const [searchValue, setSearchValue] = useState("chandigarh");
  const [tempInfo, setTempInfo] = useState({});
  const [city, setCity] = useState("");
  const { dismiss } = toast;

  const getCityName = async (latitude, longitude) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_WEATHER_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      setCity(data.name); // Set city name from the response
    } catch (error) {
      console.error("Error fetching city name:", error);
    }
  };
  const getWeatherInfo = async () => {
    dismiss(); // Dismiss any existing toast notifications
    try {
      let url = ` https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${REACT_APP_WEATHER_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeather = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeather);
    } catch (error) {
      // console.log({ error });
      toast.error("An error Occured", { theme: "dark" });

    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getWeatherInfo();
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCityName(latitude, longitude); // Pass coordinates to get city name
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="card">
        <div className="wrap">
          <div className="search">
            <input
              type="search"
              placeholder="search ...."
              autoFocus
              id="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="searchTerm"
            />

            <button
              className="searchButton"
              type="button"
              onClick={() => getWeatherInfo()}
            >
              Search
            </button>
          </div>
        </div>
        <Card tempInfo={tempInfo} />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </>
  );
};

export default Weather;
