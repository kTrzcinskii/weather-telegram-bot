declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      OPEN_WEATHER_API_KEY: string;
    }
  }
}

export {};
