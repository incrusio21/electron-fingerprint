import { Doc } from "@fyo/models/doc";
import { ListsMap } from "@fyo/models/types";
import { getCountryInfo } from "@utils/misc";

function getCurrencyList(): { countryCode: string; name: string }[] {
	const result: { countryCode: string; name: string }[] = [];
	const countryInfo = getCountryInfo();
	for (const info of Object.values(countryInfo)) {
		const { currency, code } = info ?? {};
		if (typeof currency !== 'string' || typeof code !== 'string') {
			continue;
		}

		result.push({ name: currency, countryCode: code });
	}
	return result;
}
export class SetupWizard extends Doc {
    fiscalYearEnd?: Date;
    fiscalYearStart?: Date;
  
    // formulas: FormulaMap = {
    //   fiscalYearStart: {
    //     formula: (fieldname?: string) => {
    //       if (
    //         fieldname === 'fiscalYearEnd' &&
    //         this.fiscalYearEnd &&
    //         !this.fiscalYearStart
    //       ) {
    //         return DateTime.fromJSDate(this.fiscalYearEnd)
    //           .minus({ years: 1 })
    //           .plus({ days: 1 })
    //           .toJSDate();
    //       }
  
    //       if (!this.country) {
    //         return;
    //       }
  
    //       const countryInfo = getCountryInfo();
    //       const fyStart =
    //         countryInfo[this.country as string]?.fiscal_year_start ?? '';
    //       return getFiscalYear(fyStart, true);
    //     },
    //     dependsOn: ['country', 'fiscalYearEnd'],
    //   },
    //   fiscalYearEnd: {
    //     formula: (fieldname?: string) => {
    //       if (
    //         fieldname === 'fiscalYearStart' &&
    //         this.fiscalYearStart &&
    //         !this.fiscalYearEnd
    //       ) {
    //         return DateTime.fromJSDate(this.fiscalYearStart)
    //           .plus({ years: 1 })
    //           .minus({ days: 1 })
    //           .toJSDate();
    //       }
  
    //       if (!this.country) {
    //         return;
    //       }
  
    //       const countryInfo = getCountryInfo();
    //       const fyEnd =
    //         countryInfo[this.country as string]?.fiscal_year_end ?? '';
    //       return getFiscalYear(fyEnd, false);
    //     },
    //     dependsOn: ['country', 'fiscalYearStart'],
    //   },
    //   currency: {
    //     formula: () => {
    //       const country = this.get('country');
    //       if (typeof country !== 'string') {
    //         return;
    //       }
  
    //       const countryInfo = getCountryInfo();
    //       const { code } = countryInfo[country] ?? {};
    //       if (!code) {
    //         return;
    //       }
  
    //       const currencyList = getCurrencyList();
    //       const currency = currencyList.find(
    //         ({ countryCode }) => countryCode === code
    //       );
  
    //       if (currency === undefined) {
    //         return currencyList[0].name;
    //       }
  
    //       return currency.name;
    //     },
    //     dependsOn: ['country'],
    //   },
    //   chartOfAccounts: {
    //     formula: () => {
    //       const country = this.get('country') as string | undefined;
    //       if (country === undefined) {
    //         return;
    //       }
  
    //       const countryInfo = getCountryInfo();
    //       const code = countryInfo[country]?.code;
    //       if (!code) {
    //         return;
    //       }
    //       const coaList = getCOAList();
    //       const coa = coaList.find(({ countryCode }) => countryCode === code);
    //       return coa?.name ?? coaList[0].name;
    //     },
    //     dependsOn: ['country'],
    //   },
    // };
  
    // validations: ValidationMap = {
    //   email: validateEmail,
    // };
  
    static lists: ListsMap = {
		country: () => Object.keys(getCountryInfo()),
		currency: () => getCurrencyList().map(({ name }) => name),
    //   chartOfAccounts: () => getCOAList().map(({ name }) => name),
    };
}