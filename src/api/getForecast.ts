import axios from "axios";
import { BaseForecastData, forecastDataApiLink, getBaseData } from "./helpers";

export const getForecaset = async (
  city: string
): Promise<BaseForecastData[] | number> => {
  try {
    const response = await axios.get(forecastDataApiLink(city));

    // filter data so that it's only one record per day
    const alreadyTaken: number[] = [];
    const dayInSeconds = 24 * 60 * 60;

    const filtered = response.data.list.filter((r: any) => {
      if (alreadyTaken.length === 0) {
        alreadyTaken.push(r.dt);
        return true;
      }
      const last = alreadyTaken[alreadyTaken.length - 1];
      if (r.dt - last >= dayInSeconds) {
        alreadyTaken.push(r.dt);
        return true;
      }
      return false;
    });

    const data = filtered.map((r: any) => ({
      ...getBaseData(r),
      date: r.dt,
    }));
    return data as BaseForecastData[];
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
