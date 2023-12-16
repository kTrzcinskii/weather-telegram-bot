import { Scenes, Telegraf, session } from "telegraf";
import dotenv from "dotenv";
import { startHandler, helpHandler } from "./handlers";
import { AvailableCommands } from "./actions";
import { placeHandler } from "./handlers/placeHandler";
import { placeScene } from "./scenes/placeScene";
import { BotContext } from "./botContext";
import { placeExtendHandler } from "./handlers/placeExtendHandler";
import { placeExtendScene } from "./scenes/placeExtendScene";

dotenv.config();

const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN);

const stage = new Scenes.Stage<BotContext>([placeScene, placeExtendScene]);

bot.use(session());
bot.use(stage.middleware());
bot.start((ctx) => startHandler(ctx));
bot.help((ctx) => helpHandler(ctx));

bot.command(AvailableCommands.place, (ctx) => placeHandler(ctx));
bot.command(AvailableCommands.place_extend, (ctx) => placeExtendHandler(ctx));

bot.on("message", (ctx) => {
  ctx.reply("I don't understand. Please check /help to find what I can do!");
});

bot.launch();
console.info("Bot has been launched...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
