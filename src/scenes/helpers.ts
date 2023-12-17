import {
  BaseForecastData,
  BaseWeatherData,
  ExtendWeatherData,
} from "../api/helpers";

export const createBaseWeatherMessage = (
  city: string,
  weatherData: BaseWeatherData
): string => `
<b>${city} ${weatherData.iconEmoji}</b>

Temperature: ${weatherData.currentTemperature}°C
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
})}
Sunrise: ${new Date(weatherData.sunrise * 1000).toLocaleTimeString()}
Sunset: ${new Date(weatherData.sunset * 1000).toLocaleTimeString()}

Visibility: ${weatherData.visbility} m
Cloudiness: ${weatherData.cloudiness}%

Wind speed: ${weatherData.windSpeed} m/s
Wind direction: ${weatherData.windDeg}°
${
  weatherData.rainLastHour
    ? `
Rain volume (last hour): ${weatherData.rainLastHour}mm`
    : ""
}
${
  weatherData.snowLastHour
    ? `Snow volume (last hour): ${weatherData.snowLastHour}mm`
    : ""
}
`;

export const createForecastMessage = (
  city: string,
  forecastData: BaseForecastData[]
): string => `
<b>${city} Forecast for next 5 days:</b>
${forecastData
  .map(
    (data) => `
<b>${new Date(data.date * 1000).toLocaleDateString()} ${data.iconEmoji}:</b>
Temperature: ${data.currentTemperature}°C
Temperature feels like: ${data.temperatureFeelsLike}°C
Humidity: ${data.humidity}%
Pressure: ${data.pressure}

`
  )
  .join("")}
`;
