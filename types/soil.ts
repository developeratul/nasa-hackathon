export const soilTypes = ["Loamy", "Sandy", "Clay", "Silty", "Peaty"] as const;

export type SoilType = (typeof soilTypes)[number];
