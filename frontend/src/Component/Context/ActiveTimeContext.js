import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import ApiService from "../../Service/ApiService";

export const ActiveTimeContext = createContext();

export const ActiveTimeProvider = ({ children }) => {
  const [activeTime, setActiveTime] = useState(0);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const [isChecking, setIsChecking] = useState(false); 

  const updateActivity = () => {
    const now = Date.now();
    setActiveTime((prev) => prev + Math.floor((now - lastActiveTime) / 1000));
    setLastActiveTime(now);
  };

  useEffect(() => {

    const checkActivity = async () => {
      if (!isChecking) {
        setIsChecking(true);

        const now = Date.now();
        const secondsPassed = Math.floor((now - lastActiveTime) / 1000);
        if (secondsPassed > 0) {
          updateActivity();
        }
        await setActiveTimeAsync(60);
        setIsChecking(false);
      }
    };
    const activityCheckInterval = setInterval(checkActivity, 60000);

    return () => clearInterval(activityCheckInterval);
  }, [lastActiveTime, isChecking])

  const { user } = useUser();

  const setActiveTimeAsync = async (time) => {
    if (user && user.id) {
      try {
        const response = await ApiService.saveActivity(
          { time },
          user.id
        );
      } catch (err) {
        console.log(err.response?.data?.message || "An error occurred");
      }
    }
  };

  return (
    <ActiveTimeContext.Provider value={{ activeTime, updateActivity }}>
      {children}
    </ActiveTimeContext.Provider>
  );
};
