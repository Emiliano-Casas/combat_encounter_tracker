import { createContext, useState } from "react";
import { Round } from "./constants";
import { savedRound1 } from "./constants"

type ContextType = {
	round: Round,
	setContextRound: (round: Round) => void
}
const emptyRound: Round = { roundNum: 0, turns: [] }
export const RoundContext = createContext<ContextType>({
	round: emptyRound,
	setContextRound: () => { }
});

export function RoundProvider({ children }: {
	children: React.ReactElement
}) {
	const [round, setRound] = useState(savedRound1);

	function setContextRound(newRound: Round) {
		setRound(newRound);
	}

	return (
		<RoundContext.Provider value={{ round, setContextRound }}>
			{children}
		</RoundContext.Provider>
	)
}

