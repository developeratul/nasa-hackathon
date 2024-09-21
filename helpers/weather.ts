export function getWeatherStatusIconUrl(name: string) {
  return `http://openweathermap.org/img/w/${name}.png`;
}

export function getFlagUrl(countryCode: string) {
  return `https://openweathermap.org/images/flags/${countryCode}.png`;
}

export function kelvinToCelsius(kelvin: number) {
  return (kelvin - 273.15).toFixed(0);
}
