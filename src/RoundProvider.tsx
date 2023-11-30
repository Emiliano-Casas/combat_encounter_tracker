import { createContext, useState } from "react";
import { Round } from "./constants";
import { savedRound1 } from "./constants"

type ContextType = {
	round: Round,
	setContextRound: (round: Round) => void
}

export const RoundContext = createContext<ContextType>({
	round: { roundNum: 0, turns: [] },
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

