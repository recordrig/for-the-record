import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "./Button";

storiesOf("Button", module)
  .add("default", () => <Button>Hello World</Button>)
  .add("href", () => <Button href="/no-router-is-ok">Hello World</Button>)
  .add("clicked", () => <Button clicked>Hello World</Button>)
  .add("click handler", () => (
    <Button onClick={() => alert("Button was clicked!")}>Hello World</Button>
  ));
