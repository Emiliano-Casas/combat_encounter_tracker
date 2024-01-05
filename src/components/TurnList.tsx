import { Box } from "@chakra-ui/react";
import { TurnCard } from "./turnCard/TurnCard";
import { ReactElement, useContext } from "react";
import { RoundContext } from "../RoundProvider";

export function TurnList({ addedNewTurn }: { addedNewTurn: boolean }) {
	const { round } = useContext(RoundContext);

	const displayTurns: ReactElement[] = []
	round.turns.forEach((turn, idx, turns) => {
		displayTurns.push(
			<TurnCard
				key={"turn_" + idx}
				turnIdx={idx}
				// initEditMode={addedNewTurn && idx == turns.length - 1}
				initEditMode={true}
			/>
		)
	});

	return (
		<Box
			display="flex"
			flexDir={"column"}
			alignItems="center"
			width="100%"
			height="100%"
			overflowY="auto"
			paddingX="0.5rem"
			sx={{
				"&::-webkit-scrollbar": { display: "none" },
			}}
		>
			{displayTurns}
			<Box minHeight="1.5rem"></Box>
		</Box>
	);
}
