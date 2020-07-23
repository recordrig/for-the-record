import React from "react";
import { storiesOf } from "@storybook/react";
import { Oval } from "svg-loaders-react";
import Button from "./Button";
import { ArrowRightIcon } from "./Icon";

storiesOf("Button", module)
  .add("default", () => <Button>Hello World</Button>)
  .add("href", () => <Button href="/no-router-is-ok">Hello World</Button>)
  .add("clicked", () => <Button clicked>Hello World</Button>)
  .add("appear disabled", () => <Button appearDisabled>Hello World</Button>)
  .add("click handler", () => (
    <Button onClick={() => alert("Button was clicked!")}>Hello World</Button>
  ))
  .add("with icon", () => (
    <Button>
      Check Out{" "}
      <span
        style={{
          display: "inline-block",
          height: "24px",
          marginLeft: "8px",
          position: "relative",
          top: "6px",
          width: "24px",
        }}
      >
        <ArrowRightIcon color="#ffffff" />
      </span>
    </Button>
  ))
  .add("with loading indicator", () => (
    <Button>
      Check Out{" "}
      <Oval
        style={{
          height: "24px",
          marginLeft: "8px",
          position: "relative",
          top: "4px",
          width: "24px",
        }}
      />
    </Button>
  ));
