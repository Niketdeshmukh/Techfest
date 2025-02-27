import React, { useState, useEffect } from "react";
import { Card, Button, Spin } from "antd";
import { useRouter } from "next/router";
import classes from "./competition.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppContext } from "../../context/state";
import axios from "axios";

function Competitions() {
  const router = useRouter();
  const { state } = useAppContext();
  const { eventList, setEventList } = state;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("API URL:", process.env.NEXT_PUBLIC_FETCH_API);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_FETCH_API}/events`);
        setEventList(response.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [setEventList]);

  const handleExplore = (event) => {
    router.push(`/competitions/explore?event_id=${event.event_id}`);
  };

  return (
    <div className={classes.container}>
      <h1 className="heading">Technical Events</h1>
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
            <p>No events found</p>
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
                  <Button type="primary" onClick={() => handleExplore(event)}>Explore</Button>
                </div>
              </Card>
            ))
          )
        )}
      </div>
    </div>
  );
}

export default Competitions;