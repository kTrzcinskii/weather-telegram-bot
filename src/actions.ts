export type TAvailableCommands =
  | "/here"
  | "/here_extend"
  | "/place"
  | "/place_extend"
  | "/alerts";

export interface IAction {
  command: TAvailableCommands;
  description: string;
}

export const actions: IAction[] = [
  {
    command: "/here",
    description: "I will check basic weather conditions in your area!",
  },
  {
    command: "/here_extend",
    description:
      "You will be ask for which details you want information on in your area and I will check them!",
  },
  {
    command: "/place",
    description:
      "You will be asked for a place and I will check basic weather conditions there!",
  },
  {
    command: "/place_extend",
    description:
      "You will be ask for the place and which details you want information on and I will check them!",
  },
  {
    command: "/alerts",
    description: "I will check for current weather alerts in your area!",
  },
];
