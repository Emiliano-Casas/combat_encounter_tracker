import { Box, Spacer } from "@chakra-ui/react";
import { TurnCard } from "./TurnCard";
import { useContext, useRef, useEffect } from "react";
import { RoundContext } from "../RoundProvider";

export function TurnList() {
	const stackRef = useRef<HTMLDivElement>(null);
	const { round } = useContext(RoundContext);

	// useEffect(() => {
	// 	// Scroll to the last TurnCard when the component mounts or when round.turns changes
	// 	if (stackRef.current) {
	// 		const stackElement = stackRef.current;
	// 		stackElement.scrollTo({
	// 			top: stackElement.scrollHeight,
	// 			behavior: "smooth",
	// 		});
	// 	}
	// }, [round.turns]);

	const displayTurns = round.turns.map((turn, idx) => {
		return <TurnCard key={"turn_" + idx} turnIdx={idx}></TurnCard>;
	});

	return (
		<Box
			display="flex"
			flexDir={"column"}
			alignItems="center"
			ref={stackRef}
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
