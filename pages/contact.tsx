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
import Tile, { TileContainer } from "../components/Tile";
import Form, { FormRow } from "../components/Form";
import { CheckIcon } from "../components/Icon";

const ContactPage: FunctionComponent = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    honeypot: "",
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
          message: "✅👍 Message sent. Thanks!"
        });
        setSendSuccess(true);
      } else {
        setResponse({
          type: "error",
          message: `❌😵 Hmm... some error occurred on the server. It says: "${text}". Your message has NOT been sent.`
        });
      }
    } catch (error) {
      setResponse({
        type: "error",
        message: `❌😵 Hmm... an error occurred while submitting the form: "${error}". Your message has NOT been sent.`
      });
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
                    <input
                      name="honeypot"
                      style={{ display: "none" }}
                      onChange={handleChange}
                      type="text"
                    />
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
