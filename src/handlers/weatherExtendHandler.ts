import { BotScenes } from "../botScenes";
import { BotContext } from "../botContext";

export const weatherExtendHandler = (ctx: BotContext) => {
  ctx.scene.enter(BotScenes.WeatherExtendScene);
};
