import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState
} from "react";
import Head from "next/head";
import { Oval } from "svg-loaders-react";
import Button from "../components/Button";
import { Heading, Paragraph } from "../components/Text";
import Section, { SectionIntro } from "../components/Section";
import Notification from "../components/Notification";
import Tile, { TileContainer } from "../components/Tile";
import Form, { FormRow } from "../components/Form";
import { CheckIcon } from "../components/Icon";

const ContactPage: FunctionComponent = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    sticky: "",
    message: ""
  });

  const [response, setResponse] = useState({
    type: "",
    message: ""
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void =>
    setContact({ ...contact, [event.target.name]: event.target.value });

  const [sendProcessing, setSendProcessing] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setSendProcessing(true);

    try {
      if (contact.sticky.length > 0) throw Error;

      const res = await fetch("/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      });
      const text = await res.text();

      if (res.status === 200) {
        setResponse({
          type: "success",
          message: ""
        });
        setSendSuccess(true);
      } else {
        setResponse({
          type: "error",
          message: text
        });
        console.error(text);
      }
    } catch (error) {
      setResponse({
        type: "error",
        message: error
      });
      console.error(error);
    }

    setSendProcessing(false);
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
              <Form>
                <form onSubmit={handleSubmit}>
                  <fieldset disabled={sendSuccess} style={{ border: 0 }}>
                    <FormRow>
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
                    </FormRow>
                    <FormRow>
                      <label htmlFor="contact-subject">
                        Subject
                        <input
                          id="contact-subject"
                          name="subject"
                          onChange={handleChange}
                          type="text"
                        />
                      </label>
                    </FormRow>
                    <div
                      style={{
                        height: 0,
                        left: "0",
                        overflow: "hidden",
                        position: "relative",
                        width: 0
                      }}
                    >
                      <input
                        autoComplete="no"
                        name="sticky"
                        style={{ left: "100vw", position: "absolute" }}
                        onChange={handleChange}
                        type="text"
                        tabIndex={-1}
                      />
                    </div>
                    <FormRow>
                      <label htmlFor="contact-message">
                        Message
                        <textarea
                          id="contact-message"
                          name="message"
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </FormRow>
                    <FormRow>
                      <Button
                        appearDisabled={sendProcessing || sendSuccess}
                        clicked={sendSuccess}
                      >
                        {sendSuccess ? "Sent " : "Send "}
                        {sendProcessing && (
                          <Oval
                            style={{
                              height: "24px",
                              left: "8px",
                              position: "relative",
                              top: "4px",
                              width: "24px"
                            }}
                          />
                        )}
                        {sendSuccess && (
                          <span
                            style={{
                              display: "inline-block",
                              height: "32px",
                              marginRight: "4px",
                              position: "relative",
                              top: "8px",
                              width: "32px"
                            }}
                          >
                            <CheckIcon color="#24a148" />
                          </span>
                        )}
                      </Button>
                    </FormRow>
                  </fieldset>
                  {sendSuccess && (
                    <div style={{ padding: "0 14px" }}>
                      <Notification type="success">
                        <p style={{ fontSize: "14px" }}>
                          <strong>Your message has been sent.</strong> We can
                          usually get back to you within a couple of days.
                        </p>
                      </Notification>
                    </div>
                  )}
                  {response.type === "error" && (
                    <div style={{ padding: "0 14px" }}>
                      <Notification type="error">
                        <p style={{ fontSize: "14px" }}>
                          <strong>There was a problem.</strong> Your message has
                          not been sent.
                        </p>
                      </Notification>
                    </div>
                  )}
                </form>
              </Form>
            </TileContainer>
          </Tile>
        </div>
      </Section>
    </>
  );
};

export default ContactPage;
