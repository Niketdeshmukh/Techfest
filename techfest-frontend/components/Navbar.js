import React from "react";
import { Menu } from "antd";

const Navbar = ({ selectedNavItem, setSelectedNavItem }) => {
  return (
    <Menu
      mode="horizontal"
      selectedKeys={[selectedNavItem]}
      onClick={(e) => setSelectedNavItem(e.key)}
    >
      <Menu.Item key="About">About</Menu.Item>
      <Menu.Item key="Timeline">Timeline</Menu.Item>
      <Menu.Item key="Rules">Rules</Menu.Item>
      <Menu.Item key="Contact Us">Contact Us</Menu.Item>
    </Menu>
  );
};

export default Navbar;