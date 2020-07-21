interface Country {
  readonly name: string;
}

/** All EU two-letter country code (ISO 3166-1 alpha-2). */
type CountryCodes =
  | "BE"
  | "BG"
  | "CZ"
  | "DK"
  | "DE"
  | "EE"
  | "IE"
  | "GR"
  | "ES"
  | "FR"
  | "HR"
  | "IT"
  | "CY"
  | "LV"
  | "LT"
  | "LU"
  | "HU"
  | "MT"
  | "NL"
  | "AT"
  | "PL"
  | "PT"
  | "RO"
  | "SI"
  | "SK"
  | "FI"
  | "SE";

type Countries = Record<CountryCodes, Country>;

/** A list of countries we ship to. */
const countries: Countries = {
  BE: {
    name: "Belgium"
  },
  BG: {
    name: "Bulgaria"
  },
  CZ: {
    name: "Czechia"
  },
  DK: {
    name: "Denmark"
  },
  DE: {
    name: "Germany"
  },
  EE: {
    name: "Estonia"
  },
  IE: {
    name: "Ireland"
  },
  GR: {
    name: "Greece"
  },
  ES: {
    name: "Spain"
  },
  FR: {
    name: "France"
  },
  HR: {
    name: "Croatia"
  },
  IT: {
    name: "Italy"
  },
  CY: {
    name: "Cyprus"
  },
  LV: {
    name: "Latvia"
  },
  LT: {
    name: "Lithuania"
  },
  LU: {
    name: "Luxembourg"
  },
  HU: {
    name: "Hungary"
  },
  MT: {
    name: "Malta"
  },
  NL: {
    name: "Netherlands"
  },
  AT: {
    name: "Austria"
  },
  PL: {
    name: "Poland"
  },
  PT: {
    name: "Portugal"
  },
  RO: {
    name: "Romania"
  },
  SI: {
    name: "Slovenia"
  },
  SK: {
    name: "Slovakia"
  },
  FI: {
    name: "Finland"
  },
  SE: {
    name: "Sweden"
  }
};

export default countries;
