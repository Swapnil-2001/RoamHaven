import countries, { Country } from "world-countries";

import { CountryInputValue } from "../types";

const formattedCountries: CountryInputValue[] = countries.map(
  (country: Country) => ({
    label: country.name.common,
    code: country.cca2,
    region: country.region,
    flag: country.flag,
    latlng: country.latlng,
  })
);

const useCountries = () => {
  const getAllCountries = () => formattedCountries;

  const getCountryByCode = (countryCode: string) =>
    formattedCountries.find(({ code }) => code === countryCode);

  return {
    getAllCountries,
    getCountryByCode,
  };
};

export default useCountries;
