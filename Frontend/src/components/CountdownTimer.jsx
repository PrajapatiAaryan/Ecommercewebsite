import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const getOrCreateTargetTime = () => {
    let storedTime = localStorage.getItem("targetTime");

    if (!storedTime) {
      // Set a new target time (120 days, 18 hours, 16 minutes from now)
      const newTargetDate = new Date();
      newTargetDate.setDate(newTargetDate.getDate() + 120);
      newTargetDate.setHours(newTargetDate.getHours() + 18);
      newTargetDate.setMinutes(newTargetDate.getMinutes() + 16);

      storedTime = newTargetDate.getTime();
      localStorage.setItem("targetTime", storedTime); // Store in localStorage
    }

    return parseInt(storedTime, 10);
  };

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const targetTime = getOrCreateTargetTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center   text-black lg:w-1/2 ">
      <div className="flex gap-3 text-2xl ">
        <div className="p-4 bg-white rounded-lg text-center lg:w-24 border border-gray-300">
          <p className="lg:text-2xl font-bold">{timeLeft.days}</p>
          <p className="text-sm">Days</p>
        </div>
        <div className="p-4 bg-white rounded-lg text-center lg:w-24 border border-gray-300">
          <p className="lg:text-2xl font-bold">{timeLeft.hours}</p>
          <p className="text-sm">Hours</p>
        </div>
        <div className="p-4 bg-white rounded-lg text-center lg:w-24 border border-gray-300">
          <p className="lg:text-2xl font-bold">{timeLeft.minutes}</p>
          <p className="text-sm">Minutes</p>
        </div>
        <div className="p-4 bg-white rounded-lg text-center lg:w-24 border border-gray-300">
          <p className="lg:text-2xl font-bold">{timeLeft.seconds}</p>
          <p className="text-sm">Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
