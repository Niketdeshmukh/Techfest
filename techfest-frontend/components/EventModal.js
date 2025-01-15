import React, { useState } from "react";
import { Modal, Button } from "antd";
import classes from "../styles/EventModal.module.css";
import RegistrationModal from "./RegistrationModal";

const EventModal = ({ visible, onClose, event, onRegister }) => {
  const [isRegistrationModalVisible, setIsRegistrationModalVisible] = useState(false);

  if (!event) return null;

  const handleRegisterClick = () => {
    setIsRegistrationModalVisible(true);
  };

  return (
    <>
      <Modal
        visible={visible}
        title={event.event_name}
        onCancel={onClose}
        footer={[
          <Button key="register" type="primary" onClick={handleRegisterClick}>
            Register
          </Button>,
          <Button key="close" onClick={onClose}>
            Close
          </Button>,
        ]}
      >
        <img src={event.event_image} alt={event.event_name} className={classes.modalImage} />
        <p>{event.event_description}</p>
      </Modal>
      <RegistrationModal
        visible={isRegistrationModalVisible}
        onClose={() => setIsRegistrationModalVisible(false)}
        event={event}
        onRegister={onRegister}
      />
    </>
  );
};

export default EventModal;