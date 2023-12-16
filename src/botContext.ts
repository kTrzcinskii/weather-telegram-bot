import { Scenes } from "telegraf";

export interface SessionData extends Scenes.WizardSessionData {
  city?: string;
}

export type BotContext = Scenes.WizardContext<SessionData>;
