import { BotContext } from "../botContext";
import { BotScenes } from "../botScenes";

export const forecastHandler = (ctx: BotContext) => {
  ctx.scene.enter(BotScenes.ForecastScene);
};
