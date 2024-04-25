/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
import { useEffect, React, useState } from "react";
import Searchbar from "./Searchbar";
import Weathercard from "./Weathercard";

import { ShimmerSectionHeader } from "react-shimmer-effects";
import Weatherbody from "./Weatherbody";
const Body = () => {
  const [weatherdata, setWeatherdata] = useState();
  const [cityname, setcityName] = useState("pune");
  const [getDate, setgetDate] = useState("");

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
    const key = "0baf0dab3ca4e1359t8bb81651943o3d";
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
        <h1 className="text-center font-[600] text-[30px] text-[#f06789] font-poppins drop-shadow-md">{weatherdata.message}</h1>
      ) : 
        <Weatherbody weatherdata={weatherdata} getdate={getDate} />
      }
      {weatherdata.message ? null : <Weathercard cityName={cityname} />}
    </div>
  );
};

export default Body;
