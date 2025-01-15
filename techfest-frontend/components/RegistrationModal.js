import React from "react";
import { Modal, Button, Input, Form, Radio, message } from "antd";
import axios from "axios";
import classes from "../styles/EventModal.module.css";

const RegistrationModal = ({ visible, onClose, event, onRegister }) => {
  const [form] = Form.useForm();

  const handleRegister = async () => {
    try {
      const values = await form.validateFields();
      await axios.post(`${process.env.NEXT_PUBLIC_FETCH_API}/events/register`, {
        ...values,
        event_id: event.event_id,
      });
      message.success("You have successfully registered!");
      onRegister(values);
      onClose();
    } catch (error) {
      console.error("Failed to register for event", error);
      message.error("Failed to register. Please try again.");
    }
  };

  return (
    <Modal
      visible={visible}
      title={`Register for ${event.event_name}`}
      onCancel={onClose}
      footer={[
        <Button key="register" type="primary" onClick={handleRegister}>
          Register
        </Button>,
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="First Name"
          rules={[{ required: true, message: "Please enter your first name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Last Name"
          rules={[{ required: true, message: "Please enter your last name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select your gender" }]}
        >
          <Radio.Group>
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="enrollment"
          label="Enrollment Number"
          rules={[{ required: true, message: "Please enter your enrollment number" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: "Please enter your phone number" }]}
        >
          <Input addonBefore="+91" />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: "Please enter your age" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegistrationModal;