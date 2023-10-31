import { Stack, Text } from "@chakra-ui/react";
import { Round, Turn } from "../constants";
import { TurnCard } from "./TurnCard";
import { useEffect, useRef } from "react";


export function TurnList({ rounds }: {
	rounds: Round[]
}) {
	const roundsList: any[] = [];
	rounds.map((round, idx) => {
		roundsList.push(<Text key={"round_" + idx}>Round {idx + 1}</Text>);
		const turns = round.turns.map((turn, idx) => {
			return (
				<TurnCard key={"turn_" + idx} {...turn}></TurnCard>
			);
		});
		roundsList.push(turns);
	});
	return (
		<>
			{roundsList}
		</>
	)
}