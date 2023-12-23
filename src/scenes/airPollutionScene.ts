import { Scenes } from "telegraf";
import { BotContext } from "../botContext";
import { BotScenes } from "../botScenes";
import { getAirPollution, getCoordinates } from "../api";
import { createAirPollutionMessage } from "./helpers";

export const airPollutionScene = new Scenes.WizardScene<BotContext>(
  BotScenes.AirPollutionScene,
  async (ctx) => {
    await ctx.sendMessage("Please enter city:");
    ctx.wizard.next();
  },
  async (ctx) => {
    // @ts-expect-error text does not exist on message - why?
    ctx.scene.session.city = ctx.message.text;

    await ctx.sendMessage(`
    Checking air pollution for ${ctx.scene.session.city}. Please give me a second..`);

    const coords = await getCoordinates(ctx.scene.session.city ?? "");
    if (typeof coords === "number") {
      if (coords === 404) {
        await ctx.sendMessage(
          `Cannot find data for ${ctx.scene.session.city}. Are you sure you didn't misspell it?`
        );
      } else {
        await ctx.sendMessage("An error has occured, please try again later.");
      }
      return await ctx.scene.leave();
    }

    const airPollutionData = await getAirPollution(coords);

    if (typeof airPollutionData === "number") {
      if (airPollutionData === 404) {
        await ctx.sendMessage(
          `Cannot find data for ${ctx.scene.session.city}. Are you sure you didn't misspell it?`
        );
      } else {
        await ctx.sendMessage("An error has occured, please try again later.");
      }
      return await ctx.scene.leave();
    }

    const msg = createAirPollutionMessage(
      ctx.scene.session.city!,
      airPollutionData
    );
    await ctx.sendMessage(msg, { parse_mode: "HTML" });

    return await ctx.scene.leave();
  }
);
