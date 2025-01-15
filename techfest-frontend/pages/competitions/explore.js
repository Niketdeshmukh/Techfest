import React, { useState } from "react";
import { useRouter } from "next/router";
import { Card, Button } from "antd";
import classes from "./explore.module.css";
import { useAppContext } from "../../context/state";
import RegistrationModal from "../../components/RegistrationModal";
import Navbar from "../../components/Navbar";

const Explore = () => {
  const router = useRouter();
  const { event_id } = router.query;
  const { state } = useAppContext();
  const { eventList } = state;
  const event = eventList.find((e) => e.event_id === event_id);
  const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState("About");

  if (!event) return <p>Event not found</p>;

  const handleRegisterClick = () => {
    setIsRegistrationModalVisible(true);
  };

  const handleRegister = async (values) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_FETCH_API}/events/register`, {
        ...values,
        event_id: event.event_id,
      });
      alert(`Registered for ${event.event_name}`);
    } catch (err) {
      console.error("Failed to register for event", err);
    }
  };

  const renderContent = () => {
    switch (selectedNavItem) {
      case "About":
        return <p>{event.event_description}</p>;
      case "Timeline":
        return <p>Timeline content goes here...</p>;
      case "Rules":
        return <p>Rules content goes here...</p>;
      case "Contact Us":
        return <p>Contact Us content goes here...</p>;
      default:
        return <p>{event.event_description}</p>;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.cardWrapper}>
        <Card
          hoverable
          cover={<img alt={event.event_name} src={event.event_image} />}
          className={classes.card}
        >
          <Card.Meta
            title={event.event_name}
            description={event.event_description}
          />
          <Button type="primary" onClick={handleRegisterClick} className={classes.registerButton}>
            Register
          </Button>
        </Card>
        <Card className={classes.navCard}>
          <Navbar selectedNavItem={selectedNavItem} setSelectedNavItem={setSelectedNavItem} />
          <div className={classes.navContent}>
            {renderContent()}
          </div>
        </Card>
      </div>
      <RegistrationModal
        visible={isRegistrationModalVisible}
        onClose={() => setIsRegistrationModalVisible(false)}
        event={event}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default Explore;