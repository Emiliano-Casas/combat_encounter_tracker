import { Box, Stack } from "@chakra-ui/react";
import { Round } from "../constants";
import { TurnCard } from "./TurnCard";
import { useRef } from "react";


export function TurnList({ rounds, updateRounds }: {
	rounds: Round[],
	updateRounds: (rounds: Round[]) => void
}) {
	const stackRef = useRef<HTMLDivElement>(null);

	const roundsList: any[] = [];
	rounds.map((round, idx) => {
		const turns = round.turns.map((turn, idx) => {
			return (
				<TurnCard key={"turn_" + idx} {...turn}></TurnCard>
			);
		});
		roundsList.push(turns);
	});

	return (
		<Box
			ref={stackRef}
			width="100%"
			overflowY="auto"
			sx={{
				'&::-webkit-scrollbar': { display: "none" }
			}}>
			{roundsList}
		</Box>
	)
}