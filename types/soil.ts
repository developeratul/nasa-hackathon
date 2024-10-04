export const soilTypes = [
    'Aluvial',
    'Kapur',
    'Andosol',
    'Entisol',
    'Laterit',
    'Pasir',
    'Humus',
    'Inceptisol'
  ] as const;

export type SoilType = (typeof soilTypes)[number];

export const soilCategories = ["Loamy", "Sandy", "Clay", "Silty", "Peaty"] as const;

export type SoilCategory = (typeof soilCategories)[number];

export const waterFrequencies = ["Daily", "Weekly", "Monthly", "Yearly"] as const;

export type WaterFrequency = (typeof waterFrequencies)[number];

export const fertilizerTypes = ["Organic", "Inorganic", "Compost"] as const;

export type FertilizerType = (typeof waterFrequencies)[number];
