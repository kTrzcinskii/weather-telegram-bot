import {
  AirPollutionData,
  BaseForecastData,
  BaseWeatherData,
  ExtendForecastData,
  ExtendWeatherData,
} from "../api";

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

export const createForecastExtendMessage = (
  city: string,
  forecastExtendData: ExtendForecastData[]
) => `
<b>${city} Forecast Extend for next 5 days:</b>
${forecastExtendData
  .map(
    (data) => `
<b>${new Date(data.date * 1000).toLocaleDateString()} ${data.iconEmoji}:</b>
Temperature: ${data.currentTemperature}°C
Temperature feels like: ${data.temperatureFeelsLike}°C
Humidity: ${data.humidity}%
Pressure: ${data.pressure}

Visibility: ${data.visbility} m
Cloudiness: ${data.cloudiness}%

Wind speed: ${data.windSpeed} m/s
Wind direction: ${data.windDeg}°

`
  )
  .join("")}
`;

const airQualityIndexToString = (aqi: 1 | 2 | 3 | 4 | 5): string => {
  switch (aqi) {
    case 1:
      return "good";
    case 2:
      return "fair";
    case 3:
      return "moderate";
    case 4:
      return "poor";
    case 5:
      return "very poor";
    default:
      return "";
  }
};

export const createAirPollutionMessage = (
  city: string,
  airPollutionData: AirPollutionData
) => `
<b>${city} Air Pollution:</b>
Concentration (μg/m3):
  - CO -> ${airPollutionData.concentrationCO}
  - NO -> ${airPollutionData.concentrationNO}
  - NO2 -> ${airPollutionData.concentrationNO2}
  - O3 -> ${airPollutionData.concentrationO3}
  - SO2 -> ${airPollutionData.concentrationSO2}
  - PM2.5 -> ${airPollutionData.concentrationPM2_5}
  - PM10 -> ${airPollutionData.concentrationPM10}
  - NH3 -> ${airPollutionData.concentrationNH3}
Overall air quality index: ${
  airPollutionData.airQualityIndex
} (${airQualityIndexToString(airPollutionData.airQualityIndex)})
`;
