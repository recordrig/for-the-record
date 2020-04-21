import * as React from "react";
import { storiesOf } from "@storybook/react";
import RecordRigConfigurator from "./RecordRigConfigurator";

storiesOf("RecordRigConfigurator", module)
  .add("default", () => <RecordRigConfigurator />)
  .add("black", () => <RecordRigConfigurator configuration="black" />)
  .add("white", () => <RecordRigConfigurator configuration="white" />);
