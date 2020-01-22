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
        <p style={{ padding: "120px 0", textAlign: "center" }}>
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
        <p style={{ padding: "120px 0", textAlign: "center" }}>
          Some drawer content.
          {open}
        </p>
      </Drawer>
    </>
  );
};

storiesOf("Drawer", module)
  .add("default", () => <DrawerDefaultContainer />)
  .add("open", () => <DrawerOpenContainer />);
