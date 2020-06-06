import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import Drawer from "./Drawer";

const DrawerDefaultContainer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <button onClick={toggleDrawer} type="button" style={{ fontSize: "24px" }}>
        Open drawer
      </button>
      <Drawer onClose={toggleDrawer} open={open}>
        <p style={{ padding: "120px 0 0", textAlign: "center" }}>
          Some drawer content.
          {open}
        </p>
      </Drawer>
    </>
  );
};

const DrawerOpenContainer = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <button onClick={toggleDrawer} type="button" style={{ fontSize: "24px" }}>
        Open drawer
      </button>
      <Drawer onClose={toggleDrawer} open={open}>
        <p style={{ padding: "120px 0 0", textAlign: "center" }}>
          Some drawer content.
          {open}
        </p>
      </Drawer>
    </>
  );
};

const DrawerContentContainer = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <button onClick={toggleDrawer} type="button" style={{ fontSize: "24px" }}>
        Open drawer
      </button>
      <Drawer onClose={toggleDrawer} open={open}>
        <p style={{ padding: "120px 0 0", textAlign: "center" }}>
          Some drawer content that takes up a lot of vertical space. On small
          devices, a max height will be used based on the window size do
          determine Drawer size, and the user will be able to scroll to reveal
          overflowing content.
        </p>
        <p style={{ padding: "120px 0 0", textAlign: "center" }}>
          Some drawer content that takes up a lot of vertical space. On small
          devices, a max height will be used based on the window size do
          determine Drawer size, and the user will be able to scroll to reveal
          overflowing content.
        </p>
        <p style={{ padding: "120px 0 0", textAlign: "center" }}>
          Some drawer content that takes up a lot of vertical space. On small
          devices, a max height will be used based on the window size do
          determine Drawer size, and the user will be able to scroll to reveal
          overflowing content.
        </p>
        <p style={{ padding: "120px 0 0", textAlign: "center" }}>
          Some drawer content that takes up a lot of vertical space. On small
          devices, a max height will be used based on the window size do
          determine Drawer size, and the user will be able to scroll to reveal
          overflowing content.
        </p>
      </Drawer>
    </>
  );
};

storiesOf("Drawer", module)
  .add("default", () => <DrawerDefaultContainer />)
  .add("open", () => <DrawerOpenContainer />)
  .add("high vertical content", () => <DrawerContentContainer />);
