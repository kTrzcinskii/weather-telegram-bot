export interface BaseWeatherData {
  currentTemperature: number;
  temperatureFeelsLike: number;
  temperatureMin: number;
  temperatureMax: number;
  pressure: number;
  humidity: number;
  iconEmoji: string;
}

export interface ExtendWeatherData extends BaseWeatherData {}

export const getBaseData = (d: any): BaseWeatherData => {
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

export const weatherDataApiLink = (city: string): string =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;
