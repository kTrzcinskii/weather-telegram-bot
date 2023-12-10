import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on("message", (ctx) => ctx.reply("Testing"));

bot.launch();
