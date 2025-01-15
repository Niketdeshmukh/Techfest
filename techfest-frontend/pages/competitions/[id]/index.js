import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import classes from "./eventlist.module.css";
import { useAppContext } from "../../../context/state";
import axios from "axios";

function CompetitionDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      const fetchEventData = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_FETCH_API}/events/${id}`);
          setEventData(response.data);
        } catch (err) {
          console.error("Failed to fetch event data", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchEventData();
    }
  }, [router.isReady, id]);

  return (
    <div className={classes.container}>
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
        <div>
          <h1>{eventData.event_name}</h1>
          <p>{eventData.event_description}</p>
          {/* Add more event details here */}
        </div>
      )}
    </div>
  );
}

export default CompetitionDetails;