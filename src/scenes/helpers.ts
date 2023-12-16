import { BaseWeatherData } from "../api/helpers";

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
