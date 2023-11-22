import { Box } from "@chakra-ui/react";
import { TurnCard } from "./TurnCard";
import { useContext } from "react";
import { RoundContext } from "../RoundProvider";

export function TurnList() {
	const { round } = useContext(RoundContext);

	const displayTurns = round.turns.map((turn, idx) => {
		return <TurnCard key={"turn_" + idx} turnIdx={idx}></TurnCard>;
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
