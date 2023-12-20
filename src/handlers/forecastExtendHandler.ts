import { BotContext } from "../botContext";
import { BotScenes } from "../scenes";

export const forecastExtendHandler = (ctx: BotContext) => {
  ctx.scene.enter(BotScenes.ForecastExtendScene);
};
