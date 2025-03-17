// src/types/nameForm.ts

export interface GenderData {
  gender: string;
  probability: number;
}

export interface NationalityCountry {
  country_id: string;
  probability: number;
}

export interface NationalityData {
  country: NationalityCountry[];
}

export interface AgeData {
  age: number;
}

export interface SavedCard {
  name: string;
  gender: GenderData;
  nationality: NationalityData;
  age: AgeData;
}
