import * as React from "react";
import { storiesOf } from "@storybook/react";
import RecordRigConfigurator from "./RecordRigConfigurator";

const addToBag = (color) => alert(`addToBag called with ${color}`);
const onSelectColor = (color) => alert(`onSelectColor called with ${color}`);
const onAddToBagButtonDisabledClick = (color) =>
  alert(`onAddToBagButtonDisabledClick called with ${color}`);

storiesOf("RecordRigConfigurator", module)
  .add("default", () => <RecordRigConfigurator addToBag={addToBag} />)
  .add("black", () => (
    <RecordRigConfigurator addToBag={addToBag} configuration="black" />
  ))
  .add("white", () => (
    <RecordRigConfigurator addToBag={addToBag} configuration="white" />
  ))
  .add("with handlers", () => (
    <RecordRigConfigurator
      addToBag={addToBag}
      onAddToBagButtonDisabledClick={onAddToBagButtonDisabledClick}
      onSelectColor={onSelectColor}
    />
  ));
