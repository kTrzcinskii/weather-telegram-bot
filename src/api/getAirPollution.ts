import axios from "axios";
import { Coordinates } from "./getCoordinates";

const getApiLink = (coords: Coordinates) =>
  `http://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}`;

export interface AirPollutionData {
  airQualityIndex: 1 | 2 | 3 | 4 | 5;
  concentrationCO: number;
  concentrationNO: number;
  concentrationNO2: number;
  concentrationO3: number;
  concentrationSO2: number;
  concentrationPM2_5: number;
  concentrationPM10: number;
  concentrationNH3: number;
}

export const getAirPollution = async (
  coords: Coordinates
): Promise<AirPollutionData | number> => {
  try {
    const response = await axios.get(getApiLink(coords));
    const data = response.data.list[0];
    return {
      airQualityIndex: data.main.aqi,
      concentrationCO: data.components.co,
      concentrationNO: data.components.no,
      concentrationNO2: data.components.no2,
      concentrationO3: data.components.o3,
      concentrationSO2: data.components.so2,
      concentrationPM2_5: data.components.pm2_5,
      concentrationPM10: data.components.pm10,
      concentrationNH3: data.components.nh3,
    };
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
