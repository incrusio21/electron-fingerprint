import countryInfo from '@fixtures/countryInfo.json';
import { CountryInfoMap } from "./types";

export function getCountryInfo(): CountryInfoMap {
    // @ts-ignore
    return countryInfo as CountryInfoMap;
}