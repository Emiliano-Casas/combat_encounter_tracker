import { Box, Spinner, Stack, Text } from "@chakra-ui/react";
import { Round, Turn } from "../constants";
import { TurnCard } from "./TurnCard";
import { useEffect, useRef } from "react";


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
		<Stack
			ref={stackRef}
			overflowY="auto"
			sx={{
				'&::-webkit-scrollbar': { display: "none" }
			}}>
			{roundsList}
			<Box
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
				marginY="2rem">
				{/* <Spinner
					alignSelf={"center"}></Spinner> */}
			</Box>
		</Stack>
	)
}