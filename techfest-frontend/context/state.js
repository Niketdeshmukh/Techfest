import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { handleApiError } from "../utilites";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [isRegisterVisible, setisRegisterVisible] = useState(false);
  const [eventList, setEventList] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("API URL:", process.env.NEXT_PUBLIC_FETCH_API);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_FETCH_API}/events`);
        setEventList(response.data);
      } catch (err) {
        handleApiError(err.response);
      }
    };
    fetchEvents();
  }, []);

  return (
    <AppContext.Provider
      value={{
        state: {
          isRegisterVisible,
          setisRegisterVisible,
          eventList,
          setEventList,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}