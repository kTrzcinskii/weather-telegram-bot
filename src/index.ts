import { Scenes, Telegraf, session } from "telegraf";
import dotenv from "dotenv";
import {
  startHandler,
  helpHandler,
  forecastHandler,
  weatherExtendHandler,
  weatherHandler,
  forecastExtendHandler,
  airPollutionHandler,
} from "./handlers";
import { AvailableCommands } from "./actions";
import { BotContext } from "./botContext";
import {
  airPollutionScene,
  forecastExtendScene,
  forecastScene,
  weatherExtendScene,
  weatherScene,
} from "./scenes";

dotenv.config();

const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN);

const stage = new Scenes.Stage<BotContext>([
  weatherScene,
  weatherExtendScene,
  forecastScene,
  forecastExtendScene,
  airPollutionScene,
]);

bot.use(session());
bot.use(stage.middleware());
bot.start((ctx) => startHandler(ctx));
bot.help((ctx) => helpHandler(ctx));

bot.command(AvailableCommands.weather, (ctx) => weatherHandler(ctx));
bot.command(AvailableCommands.weather_extend, (ctx) =>
  weatherExtendHandler(ctx)
);
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
