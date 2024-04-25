/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
import { useEffect, React, useState } from "react";
import Searchbar from "./Searchbar";
import Weathercard from "./Weathercard";
import ReactAnimatedWeather from "react-animated-weather";
import { ShimmerSectionHeader } from "react-shimmer-effects";
const Body = () => {
  const [weatherdata, setWeatherdata] = useState();
  const [cityname, setcityName] = useState("pune");
  const [getDate, setgetDate] = useState("");
  const [citynotFound, setcitynotFound] = useState(false);

  function getcityName(name) {
    setcityName(name.toLowerCase());
  }
  useEffect(() => {
    weather_api_data();
    let date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setgetDate(date.toLocaleDateString("en-US", options));
  }, [cityname]);

  const weather_api_data = async () => {
    // const key = "b03a640e5ef6980o4da35b006t5f2942";
    const key = "eac360db5fc86ft86450f3693e73o43f";
    let url = `https://api.shecodes.io/weather/v1/current?query=${cityname}&key=${key}`;
    await fetch(url)
      .then(async (response) => {
        {
          response.status === 200
            ? setWeatherdata(await response.json())
            : null;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return weatherdata === undefined ? (
    <div
      className=" max-[550px]:w-[100%] mt-10 p-4 bg-[#ffffff8c] rounded-[20px] shadow-lg w-[90%]
  "
    >
      <ShimmerSectionHeader center />
    </div>
  ) : (
    <div className="my-8 p-4 bg-[#ffffff8c] rounded-[20px] shadow-lg w-[90%] mx-auto max-[550px]:w-[100%]">
      <Searchbar getcityName={getcityName} />
      {weatherdata.message ? (
        <h1 className="text-center">{weatherdata.message}</h1>
      ) : (
        <div className="text-center">
          <div className="text-[30px] mb-[10px] font-poppins font-[600]">
            <p>
              {weatherdata?.city}, <span>{weatherdata?.country}</span>
            </p>
          </div>
          <div className="text-[18px] mb-[10px] font-poppins font-[500] italic">
            <p>{getDate}</p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={weatherdata?.condition?.icon_url}
              alt={weatherdata?.condition?.icon}
              className="w-[20%]"
            />
            <p className="font-[700] text-[#1e2432] text-[64px] text-center pt-[70px] font-poppins">
              {Math.round(weatherdata?.temperature?.current)}
              <sup className="font-[700] text-[#1e2432] text-[32px] text-center">
                °C | °F
              </sup>
            </p>
          </div>
          <div>
            <p className="font-[500] text-[20px] text-[#f06789] mb-[20px] font-poppins">
              {weatherdata?.condition?.description}
            </p>
          </div>
          <div className="flex justify-evenly">
            <div className="flex items-center">
              <ReactAnimatedWeather icon="WIND" size={40} />
              <div className="text-left ml-[5px] font-[500] text-[20px] text-[#1e2432] font-poppins">
                <p> {weatherdata?.wind?.speed} m/s</p>
                <p> Wind speed</p>
              </div>
            </div>
            <div className="flex items-center">
              <ReactAnimatedWeather icon="RAIN" size={40} />
              <div className="text-left ml-[5px] font-[500] text-[20px] text-[#1e2432] font-poppins">
                <p> {weatherdata?.temperature?.humidity}% </p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {weatherdata.message ? null : <Weathercard cityName={cityname} />}
    </div>
  );
};

export default Body;
