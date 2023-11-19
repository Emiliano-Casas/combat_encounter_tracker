import {
	Box,
	Card,
	CardBody,
	Flex,
	Input,
	Text,
	Container,
	Button,
	InputGroup,
	InputRightElement
} from '@chakra-ui/react'
import { listWidth, Condition } from '../constants'
import { AddIcon, MinusIcon, SmallAddIcon, TimeIcon } from '@chakra-ui/icons'
import { ChangeEvent, useContext, useEffect, useRef, useState, KeyboardEventHandler, FocusEventHandler } from 'react';
import { RoundContext } from "../RoundProvider";

export function TurnCard({ turnIdx }: { turnIdx: number }) {
	const { round, changeRound } = useContext(RoundContext)
	const [addCond, setAddCond] = useState(false);
	const [localRound, setLocalRound] = useState(round); // Local state to update immediately
	const condNameInput = useRef<HTMLInputElement>(null);
	const condCounterInput = useRef<HTMLInputElement>(null);

	const turn = localRound.turns[turnIdx];
	var bgColor = (turn.hp === null ? "#E7D0F0" : "#F0D0D0");

	useEffect(() => {
		if (condNameInput.current) {
			condNameInput.current.focus();
		};
	}, [addCond]);

	const addCondition = () => {
		if (condNameInput.current && condNameInput.current.value.trim() !== '') {
			const newCond: Condition = { name: condNameInput.current.value.trim() };
			if (condCounterInput.current && +condCounterInput.current.value > 0) {
				newCond.roundCounter = +condCounterInput.current.value;
			}
			const newRound = { ...localRound };
			newRound.turns[turnIdx].conditions.push(newCond);
			setLocalRound(newRound);
			changeRound(newRound);
		}
	}

	// Event handlers
	const onKeyDownCondition: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addCondition()
			setAddCond(false);
		}
	};
	const onBlurCondition: FocusEventHandler<HTMLInputElement> = (e) => {
		if (e.relatedTarget !== condCounterInput.current && e.relatedTarget !== condNameInput.current) {
			// Clicked outside condition name and counter inputs
			addCondition()
			setAddCond(false);
		}
	};
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
			marginY="0.5rem">
			<Card
				bgColor={bgColor}
				border="solid 1px black"
				borderRadius="10px"
				boxShadow={"2px 2px 0 black"}
				cursor="pointer">
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
								textColor="#9C3030">
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
								fontWeight={'semibold'}
								size="sm"
								width={"3.5em"}
								bgColor={"#E7B1B1"}
								border="solid 1px black"
								borderRadius="8px"
								boxShadow={"2px 2px 0 black"}
								type='number'
								paddingX="0.5em"
								// _active={{
								// 	border: "solid 2px black"
								// }}
								 />
						</Container>
					}
				</CardBody>
			</Card>
			{turn.conditions.length > 0 &&
				<Flex
					marginTop="0.38rem"
					justifyContent="center"
					flexWrap={"wrap"}
					gap={"0.3rem"}>
					{turn.conditions.map((condition, idx) => (
						<Flex
							width="auto"
							margin="0"
							color={"blacks"}
							paddingX="0.4rem"
							border="solid 1px black"
							borderRadius="10px"
							bgColor="#feda79"
							fontWeight={'semibold'}
							key={idx}
							alignItems={"center"}>
							<Text>
								{condition.name}
							</Text>
							{condition.roundCounter &&
								<>
									<TimeIcon
										ml="0.6em"
										mr="0.1em" />
									<Text>
										{condition.roundCounter}
									</Text>
								</>
							}
						</Flex>
					))}
					{addCond ?
						<InputGroup
							variant='unstyled'
							border="solid 2px black"
							borderRadius="10px"
							bgColor="#feda79"
							onKeyDown={onKeyDownCondition}
							onBlur={onBlurCondition}
							maxWidth="11em"
							paddingY="0"
							marginY="0"
						>
							<Input
								ref={condNameInput}
								paddingX="0.4rem"
								fontWeight={'semibold'}
								type={'text'}
								placeholder="Condition..."
							// textAlign={"center"}
							/>
							<InputRightElement
								width='5rem'
								height="100%">
								<Input
									ref={condCounterInput}
									textAlign={"center"}
									variant='unstyled'
									borderStart="solid 1px black"
									borderRadius="none"
									type='number'
									fontWeight={'semibold'}
									paddingX="0.1rem"
									placeholder="Rounds..."
								></Input>
							</InputRightElement>
						</InputGroup>
						:
						<Button
							id="conditionButton"
							bgColor="#feda79"
							border="solid 1px black"
							borderRadius="50%"
							alignSelf={"center"}
							margin="0"
							padding="0"
							size="xs"
							boxShadow={"2px 2px 0 black"}
							onClick={() => { setAddCond(true) }}
						>
							<SmallAddIcon
								fontSize={"1.5em"}
								margin="0"
								padding="0"
							/>
						</Button>
					}
				</Flex>
			}
		</Box>
	)
}