import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import ConsentWrapper from "./ConsentWrapper";

// Shows how one might implement a typical "cookie consent" requirement before loading
// an embedded YouTube video (and its associated cookies).
const EmbedExample = () => {
  const [consent, setConsent] = useState(false);

  const giveConsent = () => setConsent(true);

  const ContentComponent = () => (
    <div style={{ maxWidth: "720px" }}>
      <div style={{ paddingBottom: "56.25%", position: "relative" }}>
        <iframe
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          src="https://www.youtube-nocookie.com/embed/9NIdIh3f69Q?rel=0"
          style={{ height: "100%", position: "absolute", width: "100%" }}
          title="God of War intro in 4K HDR, recorded with RecordRig on PS4 Pro"
        />
      </div>
    </div>
  );

  const PlaceholderComponent = () => (
    <div
      style={{ maxWidth: "720px", overflow: "hidden", position: "relative" }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.8)",
          height: "100%",
          position: "absolute",
          textAlign: "center",
          zIndex: 1
        }}
      >
        <p>
          Google/YouTube places cookies when you load one of their video&apos;.
          Please agree with Google&apos;s{" "}
          <a href="https://policies.google.com/privacy/google-partners">
            Privacy Policy & Terms of Service
          </a>{" "}
          if you&apos;d like to load this embedded YouTube video.
        </p>
        <button onClick={() => giveConsent()} type="button">
          I agree
        </button>
      </div>
      <img
        alt=""
        src="/god_of_war_4k_hdr_thumb_lowres.jpg?v=1"
        style={{ filter: "blur(16px)", width: "100%" }}
      />
    </div>
  );

  return (
    <div>
      <ConsentWrapper
        content={<ContentComponent />}
        consentGiven={consent}
        placeholder={<PlaceholderComponent />}
      />
    </div>
  );
};

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
  ))
  .add("embed example", () => <EmbedExample />);
