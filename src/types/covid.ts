// src/types/covid.ts

export interface CovidEntry {
  date: string;
  cases?: {
    total?: {
      value?: number;
    };
  };
  testing?: {
    total?: {
      value?: number;
    };
  };
  outcomes?: {
    death?: {
      total?: {
        calculated?: {
          change_from_prior_day?: number;
        };
      };
    };
  };
}
