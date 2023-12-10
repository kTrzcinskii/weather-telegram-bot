import { Context } from "telegraf";
import { actions } from "../actions";

export const helpHandler = (ctx: Context) => {
  const message = "Here is a list of available actions:\n";
  const actionsDesc = actions.map(
    (action) => `${action.command} - ${action.description}`
  );
  ctx.reply(message + actionsDesc.join("\n"));
};
