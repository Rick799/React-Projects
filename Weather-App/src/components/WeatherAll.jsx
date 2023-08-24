import { useState } from "react";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import "./WeatherStyle.css";

const api = {
  key: "90f5434310ab89c24f6dd2d264939631",
  base: "https://api.openweathermap.org/data/2.5/",
  icons: "https://openweathermap.org/img/wn/",
};

function WeatherAll() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [unit, setUnit] = useState("metric"); // Default to Celsius

  const fetchWeatherData = (query) =>
    fetch(`${api.base}weather?q=${query}&units=${unit}&APPID=${api.key}`);

  const searchPressed = async () => {
    const response = await fetchWeatherData(search);
    const result = await response.json();
    setWeather(result);

    console.log(result);
    setSuggestions([]); // Clear suggestions
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchPressed();
      setSuggestions([]); // Clear suggestions
    }
  };

  const getCitySuggestions = async (query) => {
    const response = await fetch(
      `${api.base}find?q=${query}&type=like&sort=population&cnt=10&appid=${api.key}`
    );
    const data = await response.json();
    if (data.list) {
      const citySuggestions = data.list.map(({ name, sys }) => ({
        name,
        country: sys.country,
      }));
      setSuggestions(citySuggestions);
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    getCitySuggestions(value);
  };

  const onSuggestionClick = (suggestion) => {
    setSearch(`${suggestion.name}, ${suggestion.country}`);
    setSuggestions([]); // Clear suggestions
  };

  const getWeatherIconUrl = (iconCode) => `${api.icons}${iconCode}@2x.png`;

  const formatTimeForCity = (timezoneOffset) => {
    const currentTime = new Date();
    const cityTime = new Date(currentTime.getTime() + timezoneOffset * 1000);
    const options = {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC", // Use UTC to display the time correctly
    };

    return cityTime.toLocaleString("en-US", options);
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const convertTemperature = (temp) => {
    if (unit === "metric") {
      return Math.round(temp);
    } else {
      return Math.round((temp * 9) / 5 + 32);
    }
  };

  return (
    <div className=" h-screen font-mono bg-[url(https://media.istockphoto.com/id/1299235090/vector/cartoon-mountain-landscape-in-flat-style-design-element-for-poster-card-banner-flyer-vector.jpg?s=170667a&w=0&k=20&c=m2BurOEhl2Kn_0wvgIL2UoEVMwGL95se83T3PcG4Eps=)] bg-cover ">
      <header className="App-header">
        <h1 className="text-3xl text-white font-bold text-center pt-4 pb-8">
          Weather App
        </h1>
      </header>

      <div className="text-center pb-5">
        <input
          type="text"
          placeholder="Enter city/town..."
          onKeyDown={handleKeyPress}
          onChange={onInputChange}
          value={search}
          className="bg-transparent text-white w-2/6 focus:outline-none border-b-2 border-white mx-auto"
        />
        <button
          className="border-2 border-white rounded-md mx-3 p-1"
          onClick={searchPressed}
        >
          <AiOutlineSearch className="w-6 h-6 hover:scale-110 text-white" />
        </button>

        {suggestions.length > 0 && (
          <ul className="cursor-pointer">
            {suggestions.map((suggestion) => (
              <li
                key={`${suggestion.name}-${suggestion.country}`}
                onClick={() => onSuggestionClick(suggestion)}
                className="hover:scale-105"
              >
                {suggestion.name}, {suggestion.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {typeof weather.main !== "undefined" && (
        <div className="">
          <div className=" circle-size animate-spin-once my-12 outline-offset-8 outline-dotted border-8 border-black hover:border-white hover:transform rounded-full p-5  mx-auto relative flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="absolute top-5">
                <p className="text-xl text-center font-bold">
                  {weather.name}, {weather.sys.country}
                </p>
                <p className="text-md text-center">
                  {formatTimeForCity(weather.timezone)}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="absolute -left-4">
                <img
                  className="w-40 h-40"
                  src={getWeatherIconUrl(weather.weather[0].icon)}
                  alt={weather.weather[0].description}
                />
              </div>
              <div className="absolute left-44 hover:scale-105 cursor-pointer">
                <p className="text-9xl font-bold flex justify-start">
                  {convertTemperature(weather.main.temp)}
                  <span className="text-xl">
                    °{unit === "metric" ? "C" : "F"}
                  </span>
                </p>
              </div>

              <div className="absolute right-5 flex flex-col justify-center items-center">
                <p className="text-2xl ">{weather.weather[0].main}</p>
                <p className="text-xs text-center w-28">
                  [{weather.weather[0].description}]
                </p>
              </div>
            </div>
            <div className="absolute bottom-5 flex justify-center  text-black">
              <button
                className={`${
                  unit === "metric" ? "bg-indigo-900 text-white" : "bg-white"
                } rounded-l-md px-2 py-1`}
                onClick={toggleUnit}
              >
                °C
              </button>
              <button
                className={`${
                  unit === "imperial" ? "bg-indigo-900 text-white" : "bg-white"
                } rounded-r-md px-2 py-1`}
                onClick={toggleUnit}
              >
                °F
              </button>
            </div>
          </div>
          <div className="border w-7/12 mx-auto mb-6"></div>
          <div className="flex justify-evenly text-xl text-white pt-2 ">
            <div className="h-40 flex flex-col items-center justify-evenly">
              <p>
                <WiHumidity className="w-10 h-10" />
              </p>
              <p className="text-xl font-bold cursor-pointer hover:scale-110 py-5">
                {" "}
                {weather.main.humidity}%
              </p>
              <p className="">Humidity</p>
            </div>
            <div className="flex flex-col items-center justify-evenly">
              <p>
                <FaTemperatureHigh className="w-7 h-7" />
              </p>
              <p className="text-xl font-bold cursor-pointer hover:scale-110 py-5">
                {convertTemperature(weather.main.feels_like)}°
                {unit === "metric" ? "C" : "F"}
              </p>

              <p className="">Real Feel</p>
            </div>
            <div className="flex flex-col items-center justify-evenly">
              <p>
                <WiStrongWind className="w-10 h-10" />
              </p>
              <p className="text-xl font-bold cursor-pointer hover:scale-110 py-5">
                {weather.wind.speed} km/hr
              </p>
              <p className="">Wind</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherAll;
