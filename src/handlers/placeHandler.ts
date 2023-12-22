import { BotScenes } from "../botScenes";
import { BotContext } from "../botContext";

export const placeHandler = (ctx: BotContext) => {
  ctx.scene.enter(BotScenes.PlaceScene);
};
