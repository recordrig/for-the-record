import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import Drawer from "./Drawer";

const SomeContainer = () => {
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

storiesOf("Drawer", module).add("default", () => <SomeContainer />);

storiesOf("Drawer", module)
  .add("default", () => <SomeContainer />)
  .add("open", () => (
    <Drawer open onClose={jest.fn()}>
      <p>Content</p>
    </Drawer>
  ))
  .add("closed", () => (
    <Drawer open={false} onClose={jest.fn()}>
      <p>Content</p>
    </Drawer>
  ));
