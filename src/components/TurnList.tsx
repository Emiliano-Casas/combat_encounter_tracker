import { Stack } from "@chakra-ui/react";
import { turn } from "../constants";
import { Turn } from "./Turn";

export function TurnList() {
	const turns: turn[] = [
		{
			initiative: 33, name: "name_1", hp: 14, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }
			]
		},
		{ initiative: 1, name: "name_2", hp: null, conditions: [] },
		{
			initiative: 7, name: "name_3", hp: null, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }]
		},
		{ initiative: 2, name: "name_4", hp: 14, conditions: [] },
		{
			initiative: 33, name: "name_1", hp: 14, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }
			]
		},
		{ initiative: 1, name: "name_2", hp: null, conditions: [] },
		{
			initiative: 7, name: "name_3", hp: null, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }]
		},
		{ initiative: 2, name: "name_4", hp: 14, conditions: [] },
		{
			initiative: 33, name: "name_1", hp: 14, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }
			]
		},
		{ initiative: 1, name: "name_2", hp: null, conditions: [] },
		{
			initiative: 7, name: "name_3", hp: null, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }]
		},
		{ initiative: 2, name: "name_4", hp: 14, conditions: [] }
	]
	return (
		<Stack
			// marginX="0.7rem"
			// spacing={0}
			overflowY="auto"
			sx={{
				'&::-webkit-scrollbar': { display: "none" }
			}}>
			{
				turns.map((turn, idx) => (
					<Turn key={idx} {...turn}></Turn>
				))
			}
		</Stack >
	)
}