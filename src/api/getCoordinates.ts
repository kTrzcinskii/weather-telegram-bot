import axios from "axios";

const getApiLink = (city: string) =>
  `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`;

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const getCoordinates = async (
  city: string
): Promise<Coordinates | number> => {
  try {
    const response = await axios.get(getApiLink(city));
    const cityData = response.data[0];
    return { latitude: cityData.lat, longitude: cityData.lon };
  } catch (error) {
    console.error(error);
    // @ts-expect-error
    if (error && error.response && error.data && error.response.data.cod) {
      // @ts-expect-error
      return Number(error.response.data.cod);
    }
    return 0;
  }
};
