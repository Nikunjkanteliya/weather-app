/* eslint-disable no-unreachable */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";
import { codeMapping } from "../constants/const";

const Weathercard = ({ cityName }) => {
  const [weekdayscardData, setweekdayscardData] = useState();
  useEffect(() => {
    fetchweekDays();
  }, [cityName]);

  const fetchweekDays = async () => {
    // const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
    const apiKey = "0baf0dab3ca4e1359t8bb81651943o3d";

    const url = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`;

    await fetch(url)
      .then(async (resp) => {
        const weekdata = resp.status === 200 ? await resp.json() : null;
        setweekdayscardData(weekdata.daily);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  return weekdayscardData === undefined ? null : (
    <div>
      <div className="forecast">
        <h3 className="pt-[10px] text-center font-[500] text-[20px] text-[#f06789]  font-poppins">
          5-Day Forecast:
        </h3>

        <div className="flex justify-evenly items-center">
          {weekdayscardData &&
            weekdayscardData.slice(0, 5).map((day) => (
              <div className="flex flex-col items-center" key={day.time}>
                <p className="font-poppins text-[#272142] opacity-[0.4]">{formatDay(day.time)}</p>
                {day.condition.icon_url && (
                  <ReactAnimatedWeather
                    icon={codeMapping[day.condition.icon]}
                    color="#1e1e1e"
                    size={30}
                    animate={true}
                  />
                )}
                <p className="text-[#F65282] text-[18px] font-[700] text-center max-[550px]: flex  max-[550px]:flex-col">
                  {Math.round(day.temperature.minimum)}°{" "}
                  <span className="opacity-[0.8] ml-2 max-[550px]:ml-0 ">
                    {Math.round(day.temperature.maximum)}°
                  </span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Weathercard;
