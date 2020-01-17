import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import Drawer from "./Drawer";

const SomeContainer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    console.log("toglleDrawer");
    setOpen(!open);
  };

  return (
    <>
      <button onClick={toggleDrawer} type="button">
        Open drawer
      </button>
      <Drawer onClose={toggleDrawer} open={open}>
        <p style={{ margin: "120px 0", textAlign: "center" }}>
          Some drawer content.
          {open}
        </p>
      </Drawer>
    </>
  );
};

storiesOf("Drawer", module).add("default", () => <SomeContainer />);
