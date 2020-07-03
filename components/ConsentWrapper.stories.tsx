import React from "react";
import { storiesOf } from "@storybook/react";
import ConsentWrapper from "./ConsentWrapper";

storiesOf("ConsentWrapper", module)
  .add("default", () => (
    <ConsentWrapper
      content={
        <p>
          I&apos;m the <b>content</b>. I won&apos;t mount because consent is
          false by default.
        </p>
      }
      placeholder={
        <p>
          I&apos;m the <b>placeholder</b>. Content won&apos;t show because
          consent is false by default.
        </p>
      }
    />
  ))
  .add("consent given", () => (
    <ConsentWrapper
      content={
        <p>
          I&apos;m the <b>content</b>. I&apos;m visible now because consent has
          been explicitely given for me to load.
        </p>
      }
      consentGiven
      placeholder={
        <p>
          I&apos;m the <b>placeholder</b>. I won&apos;t show now.
        </p>
      }
    />
  ));
