import { Scenes } from "telegraf";
import { BotContext } from "../botContext";
import { BotScenes } from "../botScenes";

export const airPollutionScene = new Scenes.WizardScene<BotContext>(
  BotScenes.AirPollutionScene,
  async (ctx) => {
    await ctx.sendMessage("Please enter city:");
    ctx.wizard.next();
  },
  async (ctx) => {
    await ctx.sendMessage("TODO");

    return await ctx.scene.leave();
  }
);
