import axios from "axios";
import {
  ExtendWeatherData,
  getExtendedData,
  weatherDataApiLink,
} from "./helpers";

export const getWeatherExtend = async (
  city: string
): Promise<ExtendWeatherData | number> => {
  try {
    const response = await axios.get(weatherDataApiLink(city));
    return getExtendedData(response.data);
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
