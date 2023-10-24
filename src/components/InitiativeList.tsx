import { Box, Text, Container, Stack, Grid, Button, GridItem, Card, CardBody, Heading, CardFooter, Badge } from "@chakra-ui/react";
import { palette, turn } from "../constants";

export function InitiativeList() {
	const turns: turn[] = [
		{
			initiative: 3, name: "name_1", hp: 14, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }
			]
		},
		{ initiative: 1, name: "name_2", conditions: [] },
		{ initiative: 2, name: "name_3", conditions: [] }
	]

	return (
		// <Container backgroundColor={palette.lion1} border='2rem' borderColor={"white"}>
		<Container>
			<Stack>
				{turns.map((turn, idx) => (
					<Card key={idx} borderRadius={5} border='1px' borderColor='black'>
						<CardBody >
							<Text>{turn.initiative}</Text>
							<Text>{turn.name}</Text>
							<Text>{turn.hp}</Text>
						</CardBody>
						<CardFooter display={'flex'} flexDirection={'row'} justifyContent={'center'}>
							{turn.conditions.map((condition) => (
								<Badge colorScheme="red">{condition.name} {condition.roundCounter}</Badge>
							))}
						</CardFooter>
					</Card>
				))}
			</Stack>
		</Container>
	)
}