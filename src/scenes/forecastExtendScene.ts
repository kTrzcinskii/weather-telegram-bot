import { Scenes } from "telegraf";
import { BotContext } from "../botContext";
import { BotScenes } from "../scenes";
import { getForecastExtend } from "../api/getForecastExtend";

export const forecastExtendScene = new Scenes.WizardScene<BotContext>(
  BotScenes.ForecastExtendScene,
  async (ctx) => {
    await ctx.sendMessage("Please enter city:");
    ctx.wizard.next();
  },
  async (ctx) => {
    // @ts-expect-error text does not exist on message - why?
    ctx.scene.session.city = ctx.message.text;

    await ctx.sendMessage(
      `Checking detailed forecast for ${ctx.scene.session.city}. Please give me a second...`
    );

    const forecastExtendData = await getForecastExtend(
      ctx.scene.session.city ?? ""
    );
    if (typeof forecastExtendData === "number") {
      if (forecastExtendData === 404) {
        await ctx.sendMessage(
          `Cannot find data for ${ctx.scene.session.city}. Are you sure you didn't misspell it?`
        );
      } else {
        await ctx.sendMessage("An error has occured, please try again later.");
      }
      return await ctx.scene.leave();
    }

    const msg = "TODO";
    await ctx.sendMessage(msg, { parse_mode: "HTML" });

    return await ctx.scene.leave();
  }
);
