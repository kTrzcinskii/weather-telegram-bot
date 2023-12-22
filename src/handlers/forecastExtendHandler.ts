import { BotContext } from "../botContext";
import { BotScenes } from "../botScenes";

export const forecastExtendHandler = (ctx: BotContext) => {
  ctx.scene.enter(BotScenes.ForecastExtendScene);
};
