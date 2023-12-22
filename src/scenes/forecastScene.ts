import { Scenes } from "telegraf";
import { BotContext } from "../botContext";
import { BotScenes } from "../botScenes";
import { getForecast } from "../api/getForecast";
import { createForecastMessage } from "./helpers";

export const forecastScene = new Scenes.WizardScene<BotContext>(
  BotScenes.ForecastScene,
  async (ctx) => {
    await ctx.sendMessage("Please enter city:");
    ctx.wizard.next();
  },
  async (ctx) => {
    // @ts-expect-error text does not exist on message - why?
    ctx.scene.session.city = ctx.message.text;

    await ctx.sendMessage(
      `Checking forecast for ${ctx.scene.session.city}. Please give me a second...`
    );

    const forecastData = await getForecast(ctx.scene.session.city ?? "");
    if (typeof forecastData === "number") {
      if (forecastData === 404) {
        await ctx.sendMessage(
          `Cannot find data for ${ctx.scene.session.city}. Are you sure you didn't misspell it?`
        );
      } else {
        await ctx.sendMessage("An error has occured, please try again later.");
      }
      return await ctx.scene.leave();
    }

    const msg = createForecastMessage(ctx.scene.session.city!, forecastData);
    await ctx.sendMessage(msg, { parse_mode: "HTML" });

    return await ctx.scene.leave();
  }
);
