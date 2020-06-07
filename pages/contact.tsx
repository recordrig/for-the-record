import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState
} from "react";
import Head from "next/head";
import { Heading, Paragraph } from "../components/Text";
import Section, { SectionIntro } from "../components/Section";
import Tile, { TileContainer } from "../components/Tile";
import Form, { FormRow } from "../components/Form";

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
              <Form>
                <form
                  action="https://api.staticforms.xyz/submit"
                  method="post"
                  onSubmit={handleSubmit}
                >
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
                    <button type="submit">Send</button>
                  </FormRow>
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
