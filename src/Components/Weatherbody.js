import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
const Weatherbody = ({ weatherdata, getDate }) => {
  return (
    <>
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
              °C
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
    </>
  );
};

export default Weatherbody;
