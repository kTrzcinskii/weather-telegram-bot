import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { startHandler, helpHandler } from "./handlers";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => startHandler(ctx));

bot.help((ctx) => helpHandler(ctx));

bot.on("message", (ctx) =>
  ctx.reply("I don't understand. Please check /help to find what I can do!")
);

bot.launch();
console.info("Bot has been launched...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
