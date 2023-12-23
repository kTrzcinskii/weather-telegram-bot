import { BotScenes } from "../botScenes";
import { BotContext } from "../botContext";

export const weatherHandler = (ctx: BotContext) => {
  ctx.scene.enter(BotScenes.WeatherScene);
};
