import { Scenes } from "telegraf";
import { BotContext } from "../botContext";
import { BotScenes } from "../scenes";
import { createExtendWeatherMessage } from "./helpers";
import { getPlaceWeatherExtend } from "../api/getPlaceWeatherExtend";

export const placeExtendScene = new Scenes.WizardScene<BotContext>(
  BotScenes.PlaceExtendScene,
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

    const weatherData = await getPlaceWeatherExtend(
      ctx.scene.session.city ?? ""
    );

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
