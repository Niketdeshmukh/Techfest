import React, { useState, useEffect } from "react";
import { Card, Spin, Input, Button } from "antd";
import { useRouter } from "next/router";
import classes from "./myevents.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppContext } from "../../context/state";
import axios from "axios";

function MyEvents() {
  const router = useRouter();
  const { state } = useAppContext();
  const { eventList, setEventList } = state;
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize eventList to an empty array when the component mounts
    setEventList([]);
  }, [setEventList]);

  const onSearch = async (value) => {
    if (!value) {
      setEventList([]);
      return;
    }

    setIsLoading(true);
    try {
      console.log(`${process.env.NEXT_PUBLIC_FETCH_API}/events/registered`);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_FETCH_API}/events/registered`, { phone: value });
      setEventList(response.data);
    } catch (err) {
      console.error("Failed to fetch registered events", err);
      setEventList([]); // Clear event list on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!value) {
      setEventList([]);
    }
  };

  return (
    <div className={classes.container}>
      <h1 className="heading">My Events</h1>
      <Input.Search
        placeholder="Enter phone number"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        onChange={handleInputChange}
        value={searchValue}
      />
      <div className={classes.site_card_wrapper}>
        {isLoading ? (
          <Spin
            indicator={
              <LoadingOutlined
                size="large"
                style={{ fontSize: 42, color: "white" }}
                spin
              />
            }
          />
        ) : (
          eventList.length === 0 ? (
            <div className={classes.defaultMessage}>
              <h2>Welcome to TechFest!</h2>
              <p>Please enter your phone number to see your registered events or register for a new event.</p>
              {/* <img src="/path/to/your/theme/image.png" alt="TechFest" className={classes.defaultImage} /> */}
            </div>
          ) : (
            eventList.map((event, i) => (
              <Card
                key={i}
                hoverable
                cover={<img alt={event.event_name} src={event.event_image} />}
                className={classes.cardss}
              >
                <Card.Meta
                  title={event.event_name}
                  description={event.event_description}
                />
                <div className={classes.card_buttons}>
                  <Button type="primary" onClick={() => router.push(`/my-events/${event.event_id}`)}>Explore</Button>
                </div>
              </Card>
            ))
          )
        )}
      </div>
    </div>
  );
}

export default MyEvents;