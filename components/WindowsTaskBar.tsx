"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const LeftSection: React.FC = () => {
  return (
    <div className="group flex h-full w-[4rem] items-center">
      <button className="flex h-full w-full items-center justify-center group-hover:bg-slate-600">
        <Icon
          icon={"ri:windows-fill"}
          className={"h-7 w-7 text-white group-hover:text-sky-500"}
        />
      </button>
    </div>
  );
};

const MiddleSection: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* Example of taskbar icons */}
      <div className="h-8 w-8 rounded-md bg-blue-300"></div>
      <div className="h-8 w-8 rounded-md bg-red-300"></div>
      <div className="h-8 w-8 rounded-md bg-yellow-300"></div>
    </div>
  );
};

const RightSection: React.FC<{ time: string; date: string }> = ({
  time,
  date,
}) => (
  <div className="flex h-full w-fit items-center space-x-[1px]">
    {/* Weather Info */}
    <div className="flex h-full items-center space-x-2 px-2 hover:cursor-default hover:bg-slate-600">
      <div className="h-6 w-6 rounded-full bg-blue-400" />
      <span>26°C Mostly Cloudy</span>
    </div>
    {/* Time, Date, and Notification */}
    <div className="flex h-full w-[6rem] flex-col items-center justify-center text-sm hover:bg-slate-600 group-hover:cursor-default">
      <div>{time}</div>
      <div>{date}</div>
    </div>
  </div>
);

export default function WindowsTaskBar() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "numeric", // 'numeric' will not add a leading zero for hours
          minute: "2-digit",
          hour12: true, // Ensures 12-hour format with AM/PM
        })
      );
      setDate(now.toLocaleDateString("en-CA")); // Format YYYY-MM-DD
    };

    updateTimeAndDate(); // Initial call to set the time and date
    const interval = setInterval(updateTimeAndDate, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <div className="flex h-[3rem] w-full items-center justify-between border-t-[1px] border-gray-900 bg-slate-700 text-white">
      {/* Left Section - Start Button */}
      <LeftSection />

      {/* Middle Section - Taskbar Icons */}
      <MiddleSection />

      {/* Right Section - Time, Date, and Notification */}
      <RightSection time={time} date={date} />
    </div>
  );
}

{
  /* Notification Icon */
}
{
  /* <div className="relative">
          <div className="h-6 w-6 rounded-full bg-gray-400"></div>
          <div className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            4
          </div>
        </div> */
}
