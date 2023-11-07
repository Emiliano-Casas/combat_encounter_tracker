import { Box, Card, CardBody, Flex, Input, Text, Container } from '@chakra-ui/react'
import { Turn, listWidth } from '../constants'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

export function TurnCard(turn: Turn) {
	var bgColor = "#E7D0F0";

	if (turn.hp !== null) { bgColor = "#F0D0D0" }
	return (
		<Box
			width="100%"
			maxWidth={listWidth}
			marginTop="0.5rem">
			<Card
				bgColor={bgColor}
				border="solid 1px black"
				borderRadius="10px"
				boxShadow={"2px 2px 0 black"}>
				<CardBody
					padding="0.5rem"
					display="flex"
					alignItems={"center"}
					fontSize={'lg'}
					fontWeight="semibold"
				>
					<Text
						minWidth="1.2em"
						marginEnd={"0.5em"}
						textAlign={"end"}>
						{turn.initiative}
					</Text>
					<Text>
						{' ' + turn.name}
					</Text>
					{turn.hp !== null &&
						<Container
							flexGrow={1}
							display={"flex"}
							justifyContent={"end"}
							alignItems={"center"}
							paddingX="0"
							margin="0"
							width="auto">
							<Text
								fontSize={'2xl'}
								fontWeight={'semibold'}
								textColor="#9C3030"
							>
								{turn.hp}
							</Text>
							<Flex
								flexDir="column"
								paddingStart={"0.5rem"}
								paddingEnd={"0.3rem"}
								justifyContent={"center"}
								fontSize={"0.6em"}
								textColor="#9C3030"
								textOverflow={"ellipsis"}>
								<AddIcon></AddIcon>
								<MinusIcon></MinusIcon>
							</Flex>
							<Input
								size="sm"
								width={"3.5em"}
								bgColor={"#E7B1B1"}
								border="solid 1px black"
								borderRadius="8px"
								boxShadow={"2px 2px 0 black"}
								type='number'
								paddingX="0.5em"
								fontWeight={'semibold'} />
						</Container>
					}
				</CardBody>
			</Card>
			<Flex
				marginTop="0.38rem"
				justifyContent="center"
				flexWrap={"wrap"}
				gap={"0.3rem"}>
				{turn.conditions.map((condition, idx) => (
					<Text
						variant='outline'
						color={"blacks"}
						paddingY="0.1rem"
						paddingX="0.4rem"
						border="solid 1px black"
						borderRadius="10px"
						bgColor="#feda79"
						fontWeight={'semibold'}
						key={idx}>
						{condition.name} {condition.roundCounter}
					</Text>
				))}
			</Flex>
		</Box>
	)
}