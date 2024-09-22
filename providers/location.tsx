"use client";

import Loader from "@/components/common/Loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AppProps, CurrentLocation } from "@/types";
import { useLocalStorage } from "@mantine/hooks";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface InitialState {
  coordinates: CurrentLocation;
  setCoordinates: (
    val: CurrentLocation | ((prevState: CurrentLocation) => CurrentLocation)
  ) => void;
}

const LocationContext = createContext<InitialState | undefined>(undefined);

export function LocationProvider(props: AppProps) {
  const { children } = props;
  const [isRendered, setRendered] = useState(false);
  const [coordinates, setCoordinates] = useLocalStorage<CurrentLocation>({
    key: "current-location",
    defaultValue: undefined,
    getInitialValueInEffect: true,
  });

  const requestLocationAccess = useCallback(() => {
    if (coordinates) return;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, [coordinates, setCoordinates]);

  useEffect(() => {
    setRendered(true);
    requestLocationAccess();
  }, [requestLocationAccess]);

  if (!isRendered)
    return (
      <div className="h-full flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <LocationContext.Provider value={{ coordinates, setCoordinates }}>
      {!coordinates ? (
        <div className="w-full h-full flex justify-center items-center">
          <div>
            <Alert variant="default" className="w-full max-w-lg">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Location Access Required</AlertTitle>
              <AlertDescription>
                Enable location access so we can provide you with accurate farming services tailored
                to your area!{" "}
                <Button
                  onClick={requestLocationAccess}
                  variant="link"
                  size="sm"
                  className="px-0 py-0 h-auto"
                >
                  Enable Location
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      ) : (
        children
      )}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
