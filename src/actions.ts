export enum AvailableCommands {
  here = "here",
  here_extend = "here_extend",
  place = "place",
  place_extend = "place_extend",
  alerts = "alerts",
}

export type TAvailableCommands = keyof typeof AvailableCommands;
export interface IAction {
  command: TAvailableCommands;
  description: string;
}

export const actions: IAction[] = [
  {
    command: AvailableCommands.here,
    description: "I will check basic weather conditions in your area!",
  },
  {
    command: AvailableCommands.here_extend,
    description:
      "You will be ask for which details you want information on in your area and I will check them!",
  },
  {
    command: AvailableCommands.place,
    description:
      "You will be asked for a place and I will check basic weather conditions there!",
  },
  {
    command: AvailableCommands.place_extend,
    description:
      "You will be ask for the place and which details you want information on and I will check them!",
  },
  {
    command: AvailableCommands.alerts,
    description: "I will check for current weather alerts in your area!",
  },
];
