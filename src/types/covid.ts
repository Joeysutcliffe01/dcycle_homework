// src/types/covid.ts
export interface CovidEntry {
  date: string;
  cases?: {
    total?: {
      value?: number;
      calculated?: {
        change_from_prior_day?: number;
      };
    };
  };
  testing?: {
    total?: {
      value?: number;
      calculated?: {
        change_from_prior_day?: number;
      };
    };
  };
  outcomes?: {
    death?: {
      total?: {
        value?: number;
        calculated?: {
          change_from_prior_day?: number;
        };
      };
    };
  };
}

export interface FormattedCovidData {
  date: string;
  totalCases: number;
  newCases: number;
  avgNewCases: number;
  totalTests: number;
  newTests: number;
  avgNewTests: number;
  totalDeaths: number;
  newDeaths: number;
  avgNewDeaths: number;
}
