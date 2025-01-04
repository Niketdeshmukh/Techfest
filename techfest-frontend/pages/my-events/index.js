import React, { useState, useEffect } from "react";
import { Input, Typography } from "antd";
import classes from "./myevents.module.css";
import axios from "axios";
import { useAppContext } from "../../context/state";
import { handleApiError } from "../../utilites";
const { Search } = Input;
const { Text, Title } = Typography;
function MyEvents() {
  const [eventList, setEventList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const value = useAppContext();

  const { eventList: eventData } = value.state;
  const onSearch = async (value) => {
    setIsLoading(true);
    try {
      const response = await fetch("/db.json");
      const data = await response.json();
      if(!response.ok){
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      console.log("raw data:", data);
      const { event } = data;
      const filterEvents = event.filter((event) => 
        event.registered_users.includes(value));
      console.log("Fileterd events for phone no. :", filterEvents );
        if (filterEvents.length === 0) {
          alert("No acc found");
        
        setEventList(filterEvents);
      }}
  catch(err) {
    console.error("error fetching events", err);
  }
  finally {setIsLoading(false);}
    }
// const onSearch=(value)=>{
// console.log("onSearch triggered with value:",value);
// }

// const onSearch = (value) => {
//   setIsLoading(true);
//   axios
//     .post(
//       `${process.env.NEXT_PUBLIC_FETCH_API}/v1/account/registered_events`,
//       {
//         phone: value,
//       }
//     )
//     .then((response) => {
//       let eventIdList = response?.data?.events;
//       let filteredSearchEvents = [];
//       let idEventLength = eventIdList.length;
//       if (idEventLength == 0) {
//         handleApiError({
//           status: 400,
//           data: { errors: [{ message: "No account found here" }] },
//         });
//         return setIsLoading(false);
//       }

//       for (let i = 0; i <= 2; i++) {
//         if (idEventLength == 0) {
//           break;
//         }
//         eventData[i].events.forEach((event) => {
//           return eventIdList.forEach((id) => {
//             if (event.event_id == id) {
//               idEventLength--;
//               return filteredSearchEvents.push(event);
//             }
//           });
//         });
//       }
//       setEventList(filteredSearchEvents);
//       setIsLoading(false);
//     })
//     .catch((err) => {
//       setIsLoading(false);
//       handleApiError(err.response);
//     });
// };

return (
  <div className={classes.container}>
    <Search
      style={{ maxWidth: "50%", marginTop: "100px" }}
      className={classes.search_bar}
      placeholder={
        isLoading ? "loading..." : "please enter your registered mobile no."
      }
      disabled={isLoading}
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
    <div className={classes.event_container}>
      {eventList.length>0?(
        eventList.map((event)=>(
          <div key={event.event_id} className={classes.event_box}>
          <h1> {event.event_name}</h1>
          <p>{event.event_description}</p>
          </div>
        ))
      ):(<p>No events found.</p>)}
    </div>
  </div>
);
}

export default MyEvents;
