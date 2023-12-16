import { Scenes } from "telegraf";
import { BotScenes } from "../scenes";
import { BotContext } from "../botContext";
import { getPlaceWeather } from "../api/getPlaceWeather";

export const placeScene = new Scenes.WizardScene<BotContext>(
  BotScenes.PlaceScene,
  async (ctx) => {
    await ctx.sendMessage("Please enter city:");
    ctx.wizard.next();
  },
  async (ctx) => {
    // @ts-expect-error text does not exist on message - why?
    ctx.scene.session.city = ctx.message.text;

    await ctx.sendMessage(
      `Checking weather for ${ctx.scene.session.city}. Please give me a second...`
    );

    const weatherData = await getPlaceWeather(ctx.scene.session.city ?? "");
    if (typeof weatherData === "number") {
      if (weatherData === 404) {
        await ctx.sendMessage(
          `Cannot find data for ${ctx.scene.session.city}. Are you sure you didn't misspell it?`
        );
      } else {
        await ctx.sendMessage("An error has occured, please try again later.");
      }
      return await ctx.scene.leave();
    }

    const msg = `
    <b>${ctx.scene.session.city} ${weatherData.iconEmoji}</b>
${weatherData.currentTemperature}°C (${weatherData.temperatureMin}°C/${weatherData.temperatureMax}°C)
Temperature feels like: ${weatherData.temperatureFeelsLike}°C
Humidity: ${weatherData.humidity}%
Pressure: ${weatherData.pressure}
    `;
    await ctx.sendMessage(msg, { parse_mode: "HTML" });

    return await ctx.scene.leave();
  }
);
