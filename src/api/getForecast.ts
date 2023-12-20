import axios from "axios";
import {
  BaseForecastData,
  filtrOnePerDay,
  forecastDataApiLink,
  getBaseData,
} from "./helpers";

export const getForecaset = async (
  city: string
): Promise<BaseForecastData[] | number> => {
  try {
    const response = await axios.get(forecastDataApiLink(city));

    // filter data so that it's only one record per day
    const filtered = filtrOnePerDay(response.data.list);
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
