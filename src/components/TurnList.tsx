import { Box, Spinner, Stack, Text } from "@chakra-ui/react";
import { Round, Turn } from "../constants";
import { TurnCard } from "./TurnCard";
import { useEffect, useRef } from "react";


export function TurnList({ rounds, updateRounds }: {
	rounds: Round[],
	updateRounds: (rounds: Round[]) => void
}) {
	const stackRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const listStack = stackRef.current;
		const fillRoundsList = () => {
			if (listStack) {
				if (listStack.scrollTop + listStack.clientHeight >= listStack.scrollHeight) {
					// Reached the bottom of the scrollable content
					updateRounds([...rounds, rounds[0]]);
				}
			}
		};
		fillRoundsList();
		if (listStack) {
			listStack.addEventListener("scroll", fillRoundsList);
		}
		return () => {
			if (listStack) {
				listStack.removeEventListener("scroll", fillRoundsList);
			}
		};
	}, [rounds, updateRounds]);

	const roundsList: any[] = [];
	rounds.map((round, idx) => {
		roundsList.push(
			<Text
				textAlign={"center"}
				key={"round_" + idx}>Round {idx + 1}
			</Text>
		);
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
			{/* <Box
			marginY="4rem"></Box> */}
			<Spinner
				marginY="3rem"
				alignSelf={"center"}></Spinner>
		</Stack>
	)
}