import { BaseWeatherData, ExtendWeatherData } from "../api/helpers";

export const createBaseWeatherMessage = (
  city: string,
  weatherData: BaseWeatherData
): string => `
<b>${city} ${weatherData.iconEmoji}</b>

${weatherData.currentTemperature}°C (${weatherData.temperatureMin}°C/${weatherData.temperatureMax}°C)
Temperature feels like: ${weatherData.temperatureFeelsLike}°C

Humidity: ${weatherData.humidity}%
Pressure: ${weatherData.pressure}
    `;

export const createExtendWeatherMessage = (
  city: string,
  weatherData: ExtendWeatherData
): string => `
${createBaseWeatherMessage(city, {
  currentTemperature: weatherData.currentTemperature,
  humidity: weatherData.humidity,
  iconEmoji: weatherData.iconEmoji,
  pressure: weatherData.pressure,
  temperatureFeelsLike: weatherData.temperatureFeelsLike,
  temperatureMax: weatherData.temperatureMax,
  temperatureMin: weatherData.temperatureMin,
})}
Sunrise: ${new Date(weatherData.sunrise * 1000).toLocaleTimeString()}
Sunset: ${new Date(weatherData.sunset * 1000).toLocaleTimeString()}

Visibility: ${weatherData.visbility}m
Cloudiness: ${weatherData.cloudiness}%

Wind speed: ${weatherData.windSpeed}
Wind direction: ${weatherData.windDeg}°
${
  weatherData.rainLastHour
    ? `
    Rain volume (last hour): ${weatherData.rainLastHour}`
    : ""
}
${
  weatherData.snowLastHour
    ? `Snow volume (last hour): ${weatherData.snowLastHour}`
    : ""
}
`;
