import { BotScenes } from "../botScenes";
import { BotContext } from "../botContext";

export const placeExtendHandler = (ctx: BotContext) => {
  ctx.scene.enter(BotScenes.PlaceExtendScene);
};
