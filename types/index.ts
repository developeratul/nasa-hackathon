import { ReactNode } from "react";

export interface AppProps {
  children: ReactNode;
}

export interface CurrentLocation {
  lat: number;
  lon: number;
}
