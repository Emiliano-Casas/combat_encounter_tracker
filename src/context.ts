import { Round } from "./constants";
import { createContext } from "react";
const emptyRound: Round = { roundNum: 0, turns: [] }
export const Context = createContext(emptyRound);
export const Provider = Context.Provider;