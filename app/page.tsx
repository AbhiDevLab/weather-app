"use client";
import React, { useState } from "react";

import Input from "./components/Input";
import Current from "./components/Current";
import WeekForecast from "./components/WeekForecast";
import WeatherDetails from "./components/WeatherDetails";

type WeatherData = {
  current: {
    condition: {
      icon: string;
      text: string;
    };
    temp_f: number;
    wind_mph: number;
    humidity: number;
    wind_dir: string;
    pressure_mb: number;
    feelslike_f: number;
    vis_km: number;
  };
  location: {
    name: string;
    region: string;
  };
  forecast: {
    forecastday: DayForecast[];
  };
};

type DayForecast = {
  date: string;
  day: {
    maxtemp_f: number;
    mintemp_f: number;
    avgtemp_f: number;
    condition: {
      icon: string;
      text: string;
    };
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
};

const Home = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  // const url =
  ("http://api.weatherapi.com/v1/forecast.json?key=8b3ef4b05ea24bbf9b3161917242707&q=${location}&days=7&aqi=yes&alerts=yes");
  const url =
    "https://api.weatherapi.com/v1/forecast.json?q=${location}&days=1&key=%208b3ef4b05ea24bbf9b3161917242707";
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data: WeatherData = await response.json();
        setData(data);
        setLocation("");
        setError("");
      } catch (error) {
        setError("City not found");
        setData(null);
      }
    }
  };

  let content;
  if (data === null && error === "") {
    content = (
      <div className=" text-white text-center h-screen mt-[5rem]">
        <h2 className=" text-3xl font-bold mb-4">Welcome to the Weather App</h2>
        <p className="text-xl">Enter a city name to get the weather forecast</p>
      </div>
    );
  } else if (error !== "") {
    content = (
      <div className=" text-white text-center h-screen mt-[5rem]">
        <p className="text-3xl font-bold mb-4">City Not Found</p>
        <p className=" text-xl">Enter a Valid City</p>
      </div>
    );
  } else if (data !== null) {
    content = (
      <>
        <div>
          <Current data={data} />
          <WeekForecast data={data} />
        </div>
        <div>
          <WeatherDetails data={data} />
        </div>
      </>
    );
  }
  return (
    <div className=" b-cover bg-gradient-to-r from-blue-500 to-blue-300 h-fit">
      <div className=" bg-white/25 w-full rounded-lg flex flex-col h-fit">
        {/* INPUT AND LOGO */}
        <div className=" flex flex-col md:flex-row justify-between items-center p-12">
          <Input handleSearch={handleSearch} setLocation={setLocation} />
          <h1 className=" mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold">
            Weather App.
          </h1>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Home;
