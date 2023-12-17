import { BotContext } from "../botContext";
import { BotScenes } from "../scenes";

export const forecastHandler = (ctx: BotContext) => {
  ctx.scene.enter(BotScenes.ForecastScene);
};
