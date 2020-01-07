import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState
} from "react";
import Head from "next/head";
import withRedux from "../../../store/_withRedux";
import { Heading } from "../../../components/Text";
import Section, { SectionIntro } from "../../../components/Section";
import Tile, { TileContainer } from "../../../components/Tile";
import Form, { FormRow } from "../../../components/Form";

const CheckoutInformationPage: FunctionComponent = () => {
  // TODO: Redirect to buy-recordrig if shopping bag is empty.
  // useEffect(() => {
  //   if (!shoppingBagItems) {
  //     Router.push("/shop/buy-recordrig");
  //   }
  // });

  const [information, setInformation] = useState({
    name: "",
    addressline1: "",
    addressline2: "",
    honeypot: "",
    postalcode: "",
    city: "",
    country: "",
    email: "",
    phone: ""
  });

  const [response, setResponse] = useState({
    type: "",
    message: ""
  });

  const countries = [
    "Austria",
    "Belgium",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czechia",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Poland",
    "Portugal",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "United Kingdom"
  ];

  const handleChange = (
    // Various linter rules collide here so we disable one.
    // eslint-disable-next-line prettier/prettier
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void =>
    setInformation({ ...information, [event.target.name]: event.target.value });

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    console.log("handle submit...");
    console.log("information:", information);
    console.log("json information:", JSON.stringify(information));
    try {
      const res = await fetch("/api/customer/create", {
        method: "POST",
        body: JSON.stringify(information),
        headers: { "Content-Type": "application/json" }
      });

      const json = await res.json();

      if (json.object === "customer") {
        setResponse({
          type: "success",
          message: `✅👍 Customer created: ${json}`
        });
      } else {
        setResponse({
          type: "error",
          message: `❌😵 Hmm... some error occurred on the server. It says: "${json.message}".`
        });
      }
    } catch (error) {
      setResponse({
        type: "error",
        message: `❌😵 Hmm... an error occurred while submitting the form: "${error}".`
      });
    }
  };
  return (
    <>
      <Head>
        <title>Your information.</title>
        <meta
          name="description"
          content="Questions, thoughts, or something else you'd like to share? Fill out this form, and we'll get back to you."
        />
      </Head>
      <Section>
        <SectionIntro>
          <Heading h={1}>Your information.</Heading>
        </SectionIntro>
        <div style={{ maxWidth: "784px" }}>
          <Tile>
            <TileContainer>
              <Form>
                <form
                  action="/api/customer/create"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <FormRow>
                    <label htmlFor="info-name">
                      Name
                      <input
                        id="info-name"
                        maxLength={32}
                        name="name"
                        onChange={handleChange}
                        required
                        type="text"
                      />
                    </label>
                  </FormRow>
                  <FormRow>
                    <label htmlFor="info-addressline1">
                      Address line 1
                      <input
                        id="info-addressline1"
                        minLength={5}
                        maxLength={32}
                        name="addressline1"
                        onChange={handleChange}
                        required
                        type="text"
                      />
                    </label>
                  </FormRow>
                  <FormRow>
                    <label htmlFor="info-addressline2">
                      Address line 2 (optional)
                      <input
                        id="info-addressline2"
                        maxLength={32}
                        name="addressline2"
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
                    <label htmlFor="info-postalcode">
                      Postal code
                      <input
                        id="info-postalcode"
                        maxLength={12}
                        name="postalcode"
                        onChange={handleChange}
                        required
                        type="text"
                      />
                    </label>
                    <label htmlFor="info-city">
                      City
                      <input
                        id="info-city"
                        maxLength={29}
                        name="city"
                        onChange={handleChange}
                        required
                        type="text"
                      />
                    </label>
                  </FormRow>
                  <FormRow>
                    <label htmlFor="info-country">
                      Country
                      <select
                        id="info-country"
                        name="country"
                        onChange={handleChange}
                        required
                      >
                        <option disabled selected>
                          Select...
                        </option>
                        {countries.map(country => (
                          <option
                            value={country}
                            key={`info-country-${country}`}
                          >
                            {country}
                          </option>
                        ))}
                      </select>
                    </label>
                  </FormRow>
                  <div style={{ minHeight: "32px", paddingBottom: "12px" }}>
                    <span
                      style={{
                        color: "#697077",
                        fontSize: "13px",
                        lineHeight: "18px"
                      }}
                    >
                      Please note that at this time we are only able to ship to
                      EU countries.
                    </span>
                  </div>
                  <FormRow>
                    <label htmlFor="info-email">
                      Email
                      <input
                        id="info-email"
                        minLength={5}
                        maxLength={150}
                        name="email"
                        onChange={handleChange}
                        required
                        type="email"
                      />
                    </label>
                  </FormRow>
                  <FormRow>
                    <label htmlFor="info-phone">
                      Phone
                      <input
                        id="info-phone"
                        maxLength={16}
                        minLength={9}
                        name="phone"
                        onChange={handleChange}
                        required
                        type="tel"
                      />
                    </label>
                  </FormRow>
                  <FormRow>
                    <button type="submit">Next</button>
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

// TODO: If there's already a customerId in state, fetch customer and prefill values.
export default withRedux(CheckoutInformationPage);
