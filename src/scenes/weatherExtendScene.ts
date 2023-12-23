import { Scenes } from "telegraf";
import { BotContext } from "../botContext";
import { BotScenes } from "../botScenes";
import { createExtendWeatherMessage } from "./helpers";
import { getWeatherExtend } from "../api";

export const weatherExtendScene = new Scenes.WizardScene<BotContext>(
  BotScenes.WeatherExtendScene,
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

    const weatherData = await getWeatherExtend(ctx.scene.session.city ?? "");

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

    const msg = createExtendWeatherMessage(
      ctx.scene.session.city!,
      weatherData
    );
    await ctx.sendMessage(msg, { parse_mode: "HTML" });

    return await ctx.scene.leave();
  }
);
