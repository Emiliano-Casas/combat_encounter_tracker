import { createContext, useState } from "react";
import { Round } from "./constants";
import { savedRound1 } from "./constants"

type ContextType = {
	round: Round,
	changeRound: (round: Round) => void
}
const emptyRound: Round = { roundNum: 0, turns: [] }
export const RoundContext = createContext<ContextType>({
	round: emptyRound,
	changeRound: () => { }
});

export function RoundProvider({ children }: {
	children: React.ReactElement
}) {
	const [round, setRound] = useState(savedRound1);

	function changeRound(newRound: Round) {
		setRound(newRound);
	}

	return (
		<RoundContext.Provider value={{ round, changeRound }}>
			{children}
		</RoundContext.Provider>
	)
}

