import axios from "axios";

export interface BaseWeatherData {
  currentTemperature: number;
  temperatureFeelsLike: number;
  temperatureMin: number;
  temperatureMax: number;
  pressure: number;
  humidity: number;
  iconEmoji: string;
}

export const getPlaceWeather = async (
  city: string
): Promise<BaseWeatherData | number> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`,
      { headers: { Accept: "application/json" } }
    );
    const d = response.data;
    const data: BaseWeatherData = {
      currentTemperature: d.main.temp,
      temperatureFeelsLike: d.main.feels_like,
      temperatureMin: d.main.temp_min,
      temperatureMax: d.main.temp_max,
      pressure: d.main.pressure,
      humidity: d.main.humidity,
      iconEmoji: transformToIcon(d.weather[0].description as string),
    };
    return data;
  } catch (error) {
    console.error(error);
    // @ts-expect-error
    return Number(error.response.data.cod);
  }
};

const transformToIcon = (description: string): string => {
  switch (description) {
    case "clear sky":
      return "☀️";
    case "few clouds":
      return "🌤";
    case "scattered clouds":
    case "broken clouds":
      return "☁️";
    case "shower rain":
    case "rain":
      return "🌧";
    case "thunderstorm":
      return "🌩";
    case "snow":
      return "❄️";
    case "mist":
      return "💨";
    default:
      return "";
  }
};
