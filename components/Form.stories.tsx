import * as React from "react";
import { storiesOf } from "@storybook/react";
import Tile, { TileContainer } from "./Tile";
import Form, { FormRow } from "./Form";

storiesOf("Form", module).add("default", () => (
  <div style={{ maxWidth: "784px" }}>
    <Tile>
      <TileContainer>
        <Form>
          <form>
            <FormRow>
              <label htmlFor="contact-name">
                Name
                <input id="contact-name" name="name" required type="text" />
              </label>
              <label htmlFor="contact-email">
                Email
                <input id="contact-email" name="email" required type="email" />
              </label>
            </FormRow>
            <FormRow>
              <label htmlFor="contact-category">
                Category
                <select id="info-category" name="category" required>
                  <option disabled selected>
                    Select...
                  </option>
                  <option value="compliment">Compliment</option>
                  <option value="complaint">Complaint</option>
                  <option value="question">Question</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </FormRow>
            <FormRow>
              <label htmlFor="contact-subject">
                Subject
                <input id="contact-subject" name="subject" type="text" />
              </label>
            </FormRow>
            <FormRow>
              <label htmlFor="contact-message">
                Message
                <textarea id="contact-message" name="message" required />
              </label>
            </FormRow>
            <FormRow>
              <button type="button">Send</button>
            </FormRow>
          </form>
        </Form>
      </TileContainer>
    </Tile>
  </div>
));
