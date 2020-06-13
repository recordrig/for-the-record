import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "./Button";

storiesOf("Button", module)
  .add("default", () => <Button>Hello World</Button>)
  .add("anchor", () => <Button isLink>Hello World</Button>)
  .add("clicked", () => <Button clicked>Hello World</Button>)
  .add("click handler", () => (
    <Button onClick={() => alert("Button was clicked!")}>Hello World</Button>
  ));
