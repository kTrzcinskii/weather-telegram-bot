import { BotContext } from "../botContext";
import { BotScenes } from "../scenes";

export const airPollutionHandler = (ctx: BotContext) => {
  ctx.scene.enter(BotScenes.AirPollutionScene);
};
