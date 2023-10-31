import { Badge, Card, CardBody, CardFooter, Text } from '@chakra-ui/react'
import { palette, Turn } from '../constants'

export function TurnCard(turn: Turn) {
	return (
		<Card
			bg={palette.khaki_light}
			borderRadius={"1rem"}
			padding="0.5rem"
			margin="0.7rem">
			{/* Initiative */}
			<Text
				position="absolute"
				left="-2"
				top="-2"
				bg={"teal"}
				width={"2.278em"}
				fontSize={"lg"}
				borderRadius="full"
				border=".2em"
				borderStyle="solid"
				borderColor={palette.onyx}
				textAlign={'center'}
				textColor={'white'}
				padding="1"
				zIndex={1}>
				{turn.initiative}
			</Text>
			{/* Name */}
			<Text
				position="absolute"
				bg={palette.onyx}
				pl="9"
				pr="2"
				fontSize={"md"}
				border={".1rem"}
				borderStyle={"outset"}
				borderColor={palette.cadet_gray}
				textColor="white"
				borderRadius={5}>
				{turn.name}
			</Text>
			{/* HP */}
			<CardBody
				padding="0"
				minHeight={"2rem"}>
				{turn.hp !== null &&
					<Text
						paddingX="0.5rem"
						bg={palette.rosewood}
						align={"right"}
						color="white"
						fontSize={"2xl"}
						borderRadius="0.5rem"
						border="0.2em"
						borderStyle="inset"
						borderColor={palette.khaki}>
						{turn.hp}
					</Text>
				}
			</CardBody>
			{/* CONDITIONS */}
			{
				turn.conditions.length > 0 &&
				<CardFooter
					paddingY="0.25rem"
					display={'flex'}
					flexDirection={'row'}
					justifyContent={'center'}
					bg={palette.khaki}
					marginTop=".5rem"
					borderRadius="0.5rem"
					border="0.2em"
					borderStyle="inset"
					borderColor={palette.khaki}>
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