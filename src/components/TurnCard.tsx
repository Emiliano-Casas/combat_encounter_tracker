import { Badge, Box, Card, CardFooter, Container, Text } from '@chakra-ui/react'
import { Turn } from '../constants'

export function TurnCard(turn: Turn) {
	var bgColor = "#f2e6f7";
	if (turn.hp !== null) { bgColor = "#f7e6e6" }
	return (
		<Box
			width="640px">
			<Card
				bgColor={bgColor}
				border="solid 1px black"
				borderRadius="8px"
				padding="0.5rem"
				margin="0.7rem"
				boxShadow={"4px 4px 0 black"}>
				<Container
					display="flex">
					<Text>
						{turn.initiative}
					</Text>
					<Text>
						{turn.name}
					</Text>
					{turn.hp !== null &&
						<Text>
							{turn.hp}
						</Text>
					}
				</Container>
				{/* CONDITIONS */}
			</Card >

			{turn.conditions.map((condition, idx) => (
				<Badge
					key={idx}
					marginX={"0.1rem"}>
					{condition.name} {condition.roundCounter}
				</Badge>
			))}
		</Box>
	)
}