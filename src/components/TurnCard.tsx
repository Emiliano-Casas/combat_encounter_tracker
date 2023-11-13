import {
	Box,
	Card,
	CardBody,
	Flex,
	Input,
	Text,
	Container,
	defineStyle,
	defineStyleConfig,
	Button
} from '@chakra-ui/react'
import { listWidth } from '../constants'
import { AddIcon, MinusIcon, SmallAddIcon } from '@chakra-ui/icons'
import { ChangeEvent, useContext, useState } from 'react';
import { RoundContext } from "../RoundProvider";


export function TurnCard({ turnIdx }: { turnIdx: number }) {
	const { round, changeRound } = useContext(RoundContext)
	const [edit, setEdit] = useState(false);
	const [localRound, setLocalRound] = useState(round); // Local state to update immediately

	const turn = localRound.turns[turnIdx];
	var bgColor = (turn.hp === null ? "#E7D0F0" : "#F0D0D0");

	// Event handlers
	const onBlur = () => {
		setEdit(false);
	}
	const onFocus = () => {
		setEdit(true);
	}
	const onChangeInitiative = (e: ChangeEvent<HTMLInputElement>) => {
		const newRound = { ...localRound };
		newRound.turns[turnIdx].initiative = +e.target.value;
		setLocalRound(newRound);
		changeRound(newRound);
	};
	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		const newRound = { ...localRound };
		newRound.turns[turnIdx].name = e.target.value;
		setLocalRound(newRound);
		changeRound(newRound);
	}

	return (
		<Box
			width="100%"
			maxWidth={listWidth}
			marginY="0.5rem"
			onFocus={onFocus}
			onBlur={onBlur}>
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
					fontWeight="semibold">
					<Input
						key="asdf"
						type='number'
						value={turn.initiative}
						// readOnly={!edit}
						onChange={onChangeInitiative}
						fontSize={'lg'}
						fontWeight="semibold"
						textAlign={"end"}
						maxWidth="2em"
						paddingStart={"0"}
						paddingX="0.25em"
						border="none"
						variant={'unstyled'}
					/>
					<Input
						value={turn.name}
						// readOnly={!edit}
						onChange={onChangeName}
						fontSize={'lg'}
						fontWeight="semibold"
						paddingStart="0.25em"
						marginEnd="0.25em"
						border="none"
						variant={'unstyled'}
					/>
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
								paddingX="0.5em" />
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
					// <Input
					// 	variant='outline'
					// 	color={"blacks"}
					// 	paddingY="0.1rem"
					// 	paddingX="0.4rem"
					// 	border="solid 1px black"
					// 	borderRadius="10px"
					// 	bgColor="#feda79"
					// 	fontWeight={'semibold'}
					// 	key={idx}
					// 	value={condition.name + ' ' + condition.roundCounter}>
					// </Input>
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
				{turn.conditions.length > 0 &&
					<Button
						bgColor="#feda79"
						border="solid 1px black"
						borderRadius="50%"
						alignSelf={"center"}
						margin="0"
						padding="0"
						size="xs"
						boxShadow={"2px 2px 0 black"}
					>
						<SmallAddIcon
							fontSize={"1.5em"}
							// height="1rem"
							// width="0.6em"
							margin="0"
							padding="0"
						/>
					</Button>
				}

			</Flex>
		</Box>
	)
}