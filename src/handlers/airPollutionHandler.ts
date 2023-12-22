import { BotContext } from "../botContext";
import { BotScenes } from "../botScenes";

export const airPollutionHandler = (ctx: BotContext) => {
  ctx.scene.enter(BotScenes.AirPollutionScene);
};
