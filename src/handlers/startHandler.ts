import { Context } from "telegraf";

export const startHandler = (ctx: Context) => {
  ctx.reply(
    "Welcome. I'm Weather Bot and I'm happy to help you today. Please use /help for learning about my commands :)."
  );
};
