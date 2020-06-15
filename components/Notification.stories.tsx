import React from "react";
import { storiesOf } from "@storybook/react";
import Notification from "./Notification";

const content = (
  <p style={{ fontSize: "14px" }}>
    Here&apos;s a notification. You could pass pretty much anything as children.
  </p>
);

storiesOf("Notification", module)
  .add("default (info)", () => <Notification>{content}</Notification>)
  .add("error", () => <Notification type="error">{content}</Notification>)
  .add("success", () => <Notification type="success">{content}</Notification>)
  .add("warning", () => <Notification type="warning">{content}</Notification>);
