export enum AvailableCommands {
  place = "place",
  place_extend = "place_extend",
  forecast = "forecast",
  forecast_extend = "forecast_extend",
  air_pollution = "air_pollution",
}

export type TAvailableCommands = keyof typeof AvailableCommands;
export interface IAction {
  command: TAvailableCommands;
  description: string;
}

export const actions: IAction[] = [
  {
    command: AvailableCommands.place,
    description:
      "You will be asked for a place and I will check basic weather conditions there!",
  },
  {
    command: AvailableCommands.place_extend,
    description:
      "You will be ask for the placeI will check weather conditions there!",
  },
  {
    command: AvailableCommands.forecast,
    description:
      "You will be asked for a place and I will check basic weather forecast for next 5 days there!",
  },
  {
    command: AvailableCommands.forecast_extend,
    description:
      "You will be asked for a place and I will check weather forecast for next 5 days there!",
  },
  {
    command: AvailableCommands.air_pollution,
    description:
      "You will be asked for a place and I will check current air pollution there!",
  },
];
