import { Badge, Card, CardBody, CardFooter, Text } from '@chakra-ui/react'
import { palette, Turn } from '../constants'

export function TurnCard(turn: Turn) {
	return (
		<Card
			borderRadius={"1rem"}
			padding="0.5rem"
			margin="0.7rem">
			{/* Initiative */}
			<Text>
				{turn.initiative}
			</Text>
			{/* Name */}
			<Text>
				{turn.name}
			</Text>
			{/* HP */}
			<CardBody
				padding="0"
				minHeight={"2rem"}>
				{turn.hp !== null &&
					<Text
						>
						{turn.hp}
					</Text>
				}
			</CardBody>
			{/* CONDITIONS */}
			{
				turn.conditions.length > 0 &&
				<CardFooter>
					{turn.conditions.map((condition, idx) => (
						<Badge
							key={idx}
							colorScheme="red"
							marginX={"0.1rem"}>
							{condition.name} {condition.roundCounter}
						</Badge>
					))}
				</CardFooter>
			}
		</Card >
	)
}