import axios from "axios";
import {
  ExtendForecastData,
  filtrOnePerDay,
  forecastDataApiLink,
  getExtendedData,
} from "./helpers";

export const getForecastExtend = async (
  city: string
): Promise<ExtendForecastData[] | number> => {
  try {
    const response = await axios.get(forecastDataApiLink(city));
    // filter data so that it's only one record per day
    const filtered = filtrOnePerDay(response.data.list);
    const data = filtered.map((r: any) => ({
      ...getExtendedData(r),
      date: r.dt,
    }));
    return data as ExtendForecastData[];
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
