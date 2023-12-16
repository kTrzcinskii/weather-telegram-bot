export interface BaseWeatherData {
  currentTemperature: number;
  temperatureFeelsLike: number;
  temperatureMin: number;
  temperatureMax: number;
  pressure: number;
  humidity: number; // %
  iconEmoji: string;
}

export interface ExtendWeatherData extends BaseWeatherData {
  visbility: number; // m
  windSpeed: number; // m/s
  windDeg: number; // 0-359
  cloudiness: number; // %
  rainLastHour?: number; // rain volume for last hour in mm
  snowLastHour?: number; // snow volume for last hour in mm
  sunrise: number; // unix utc
  sunset: number; // unix utc
}

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

export const getExtendedData = (d: any): ExtendWeatherData => {
  const base = getBaseData(d);
  const rain = d.rain && d.rain["1h"] ? d.rain["1h"] : null;
  const snow = d.snow && d.snow["1h"] ? d.snow["1h"] : null;
  const data: ExtendWeatherData = {
    ...base,
    visbility: d.visibility,
    windDeg: d.wind.deg,
    windSpeed: d.wind.speed,
    cloudiness: d.clouds.all,
    rainLastHour: rain,
    snowLastHour: snow,
    sunrise: d.sys.sunrise,
    sunset: d.sys.sunset,
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
