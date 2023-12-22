import { Scenes, Telegraf, session } from "telegraf";
import dotenv from "dotenv";
import {
  startHandler,
  helpHandler,
  forecastHandler,
  placeExtendHandler,
  placeHandler,
  forecastExtendHandler,
  airPollutionHandler,
} from "./handlers";
import { AvailableCommands } from "./actions";
import { placeScene } from "./scenes/placeScene";
import { BotContext } from "./botContext";
import { placeExtendScene } from "./scenes/placeExtendScene";
import { forecastScene } from "./scenes/forecastScene";
import { forecastExtendScene } from "./scenes/forecastExtendScene";
import { AirPollutionScene } from "./scenes/airPollutionScene";

dotenv.config();

const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN);

const stage = new Scenes.Stage<BotContext>([
  placeScene,
  placeExtendScene,
  forecastScene,
  forecastExtendScene,
  AirPollutionScene,
]);

bot.use(session());
bot.use(stage.middleware());
bot.start((ctx) => startHandler(ctx));
bot.help((ctx) => helpHandler(ctx));

bot.command(AvailableCommands.place, (ctx) => placeHandler(ctx));
bot.command(AvailableCommands.place_extend, (ctx) => placeExtendHandler(ctx));
bot.command(AvailableCommands.forecast, (ctx) => forecastHandler(ctx));
bot.command(AvailableCommands.forecast_extend, (ctx) =>
  forecastExtendHandler(ctx)
);
bot.command(AvailableCommands.air_pollution, (ctx) => airPollutionHandler(ctx));

bot.on("message", (ctx) => {
  ctx.reply("I don't understand. Please check /help to find what I can do!");
});

bot.launch();
console.info("Bot has been launched...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
