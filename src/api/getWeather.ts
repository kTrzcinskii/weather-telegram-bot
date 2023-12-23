import axios from "axios";
import { BaseWeatherData, getBaseData, weatherDataApiLink } from "./helpers";

export const getWeather = async (
  city: string
): Promise<BaseWeatherData | number> => {
  try {
    const response = await axios.get(weatherDataApiLink(city));
    return getBaseData(response.data);
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
