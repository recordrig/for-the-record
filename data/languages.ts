interface Language {
  readonly name: string;
}

/**
 * All EU two-letter country codes (ISO 639-1).
 * European languages: https://publications.europa.eu/code/en/en-5000800.htm
 */
type LanguageCodes =
  | "BG"
  | "CS"
  | "DA"
  | "DE"
  | "EL"
  | "EN"
  | "ES"
  | "ET"
  | "FI"
  | "FR"
  | "GA"
  | "HR"
  | "HU"
  | "IT"
  | "LT"
  | "LV"
  | "MT"
  | "NL"
  | "PL"
  | "PT"
  | "RO"
  | "SK"
  | "SL"
  | "SV";

type Languages = Record<LanguageCodes, Language>;

/**
 * A list of languages we'd like to support. Currently used for the blog.
 */
const languages: Languages = {
  BG: {
    name: "Bulgarian",
  },
  CS: {
    name: "Czech",
  },
  DA: {
    name: "Danish",
  },
  DE: {
    name: "German",
  },
  EL: {
    name: "Greek",
  },
  EN: {
    name: "English",
  },
  ES: {
    name: "Spanish",
  },
  ET: {
    name: "Estonian",
  },
  FI: {
    name: "Finnish",
  },
  FR: {
    name: "French",
  },
  GA: {
    name: "Irish",
  },
  HR: {
    name: "Croatian",
  },
  HU: {
    name: "Hungarian",
  },
  IT: {
    name: "Italian",
  },
  LT: {
    name: "Lithuanian",
  },
  LV: {
    name: "Latvian",
  },
  MT: {
    name: "Maltese",
  },
  PL: {
    name: "Polish",
  },
  NL: {
    name: "Dutch",
  },
  PT: {
    name: "Portuguese",
  },
  RO: {
    name: "Romanian",
  },
  SK: {
    name: "Slovak",
  },
  SL: {
    name: "Slovenian",
  },
  SV: {
    name: "Swedish",
  },
};

export default languages;
