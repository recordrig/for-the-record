import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState
} from "react";
import Head from "next/head";
import styled from "styled-components";
import { Heading, Paragraph } from "../components/Text";
import Section, { SectionIntro } from "../components/Section";
import Tile, { TileContainer } from "../components/Tile";

const StyledFormRow = styled.div`
  padding-bottom: 12px;
`;

const StyledSendButton = styled.button`
  background-color: #0062ff;
  border-radius: 2px;
  border: 0;
  color: #ffffff;
  display: block;
  font-size: 18px;
  height: 48px;
  outline: none;
  padding-left: 32px;
  padding-right: 32px;
  text-decoration: none;
`;

const StyledForm = styled.form`
  label {
    color: #50565b;
    font-size: 14px;
    line-height: 28px;
    margin-bottom: 4px;
  }

  input {
    display: block;
    font-size: 16px;
    height: 42px;
    line-height: 16px;
    padding-top: 0;
  }

  textarea {
    height: 160px;
    font-size: 16px;
    line-height: 21px;
    padding-bottom: 10px;
    padding-top: 10px;
  }

  input,
  textarea {
    background-color: #f2f4f8;
    border: 2px solid transparent;
    border-radius: 0;
    box-shadow: none;
    box-sizing: border-box;
    outline: none;
    padding-left: 12px;
    padding-right: 12px;
    width: 100%;
    -webkit-appearance: none;
  }

  input:focus,
  textarea:focus {
    border: 2px solid #0062ff;
    box-shadow: none;
    outline: none;
  }
`;

const ContactPage: FunctionComponent = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    honeypot: "",
    message: "",
    replyTo: "@",
    accessKey: "03382db7-b941-4589-893c-399397bb40b3"
  });

  const [response, setResponse] = useState({
    type: "",
    message: ""
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void =>
    setContact({ ...contact, [event.target.name]: event.target.value });

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const res = await fetch("https://api.staticforms.xyz/submit", {
        method: "POST",
        body: JSON.stringify(contact),
        headers: { "Content-Type": "application/json" }
      });

      const json = await res.json();

      if (json.success) {
        setResponse({
          type: "success",
          message: "✅👍 Message sent. Thanks!"
        });
      } else {
        setResponse({
          type: "error",
          message: `❌😵 Hmm... some error occurred on the server. It says: "${json.message}". Your message has NOT been sent.`
        });
      }
    } catch (error) {
      setResponse({
        type: "error",
        message: `❌😵 Hmm... an error occurred while submitting the form: "${error}". Your message has NOT been sent.`
      });
    }
  };
  return (
    <>
      <Head>
        <title>Contact RecordRig.</title>
        <meta
          name="description"
          content="Questions, thoughts, or something else you'd like to share? Fill out this form, and we'll get back to you."
        />
      </Head>
      <Section>
        <SectionIntro>
          <Heading h={1}>Contact RecordRig.</Heading>
          <Paragraph>
            Questions, thoughts, or something else you&apos;d like to share?
            Fill out this form, and we&apos;ll get back to you.
          </Paragraph>
        </SectionIntro>
        <div style={{ maxWidth: "784px" }}>
          <Tile>
            <TileContainer>
              <StyledForm
                action="https://api.staticforms.xyz/submit"
                method="post"
                onSubmit={handleSubmit}
              >
                <StyledFormRow>
                  <label htmlFor="contact-name">
                    Name
                    <input
                      id="contact-name"
                      name="name"
                      onChange={handleChange}
                      required
                      type="text"
                    />
                  </label>
                </StyledFormRow>
                <StyledFormRow>
                  <label htmlFor="contact-email">
                    Email
                    <input
                      id="contact-email"
                      name="email"
                      onChange={handleChange}
                      required
                      type="email"
                    />
                  </label>
                </StyledFormRow>
                <StyledFormRow>
                  <label htmlFor="contact-subject">
                    Subject
                    <input
                      id="contact-subject"
                      name="subject"
                      onChange={handleChange}
                      type="text"
                    />
                  </label>
                </StyledFormRow>
                <input
                  name="honeypot"
                  style={{ display: "none" }}
                  onChange={handleChange}
                  type="text"
                />
                <StyledFormRow>
                  <label htmlFor="contact-message">
                    Message
                    <textarea
                      id="contact-message"
                      name="message"
                      onChange={handleChange}
                      required
                    />
                  </label>
                </StyledFormRow>
                <StyledFormRow>
                  <StyledSendButton type="submit">Send</StyledSendButton>
                </StyledFormRow>
                <div style={{ height: "48px", fontWeight: "bold" }}>
                  <span
                    style={
                      response.type === "error"
                        ? { color: "#da1e28" }
                        : { color: "#24a148" }
                    }
                  >
                    {response.message}
                  </span>
                </div>
              </StyledForm>
            </TileContainer>
          </Tile>
        </div>
      </Section>
    </>
  );
};

export default ContactPage;
