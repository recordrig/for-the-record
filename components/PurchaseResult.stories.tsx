import * as React from "react";
import { storiesOf } from "@storybook/react";
import PurchaseResult from "./PurchaseResult";

const address = {
  name: "Firstname Lastname",
  line1: "Somestreet 20",
  line2: "",
  postalCode: "ABAB 12",
  city: "Mycity",
  country: "Bestcountry"
};

const products = [
  {
    description: "RecordRig - Stealth Black",
    quantity: 1,
    price: 300000
  },
  {
    description: "RecordRig - Pristine White",
    quantity: 1,
    price: 300000
  }
];

storiesOf("PurchaseResult", module).add("default", () => (
  <PurchaseResult
    billingContent={address}
    products={products}
    shippingContent={address}
    totalPrice={600000}
  />
));
