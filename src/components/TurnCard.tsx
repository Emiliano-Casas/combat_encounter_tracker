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
	InputRightElement,
	Checkbox
} from '@chakra-ui/react';
import {
	ChangeEvent,
	useContext,
	useEffect,
	useRef,
	useState,
	KeyboardEventHandler,
	FocusEventHandler,
	MouseEvent
} from 'react';
import { listWidth, Condition, Round } from '../constants'
import { AddIcon, MinusIcon, SmallAddIcon, DeleteIcon, TimeIcon } from '@chakra-ui/icons'
import { RoundContext } from "../RoundProvider";

export function TurnCard({ turnIdx }: { turnIdx: number }) {
	const { round, setContextRound } = useContext(RoundContext);
	const modes = ["default", "add condition", "delete condition"];
	const [mode, setMode] = useState(modes[0]);
	// Local Round state to re-render immediately upon change
	const [localRound, setLocalRound] = useState(round);
	const condNameInput = useRef<HTMLInputElement>(null);
	const condCounterInput = useRef<HTMLInputElement>(null);

	const turn = localRound.turns[turnIdx];
	var barColor = (turn.hp === null ? "#E7D0F0" : "#F0D0D0");

	useEffect(() => {
		if (condNameInput.current) {
			condNameInput.current.focus();
		};
	}, [mode]);

	const updateRound = (newRound: Round) => {
		setLocalRound(newRound);
		setContextRound(newRound);
	}

	const addCondition = () => {
		if (condNameInput.current && condNameInput.current.value.trim() !== '') {
			const newCond: Condition = { name: condNameInput.current.value.trim() };
			if (condCounterInput.current && +condCounterInput.current.value > 0) {
				newCond.roundCounter = +condCounterInput.current.value;
			}
			const newRound = { ...localRound };
			newRound.turns[turnIdx].conditions.push(newCond);
			setLocalRound(newRound);
			setContextRound(newRound);
		}
	}

	// Event handlers
	const onKeyDownCondition: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addCondition()
			setMode(modes[0]);
		}
	};
	const onBlurConditionInput: FocusEventHandler<HTMLInputElement> = (e) => {
		if (e.relatedTarget !== condCounterInput.current && e.relatedTarget !== condNameInput.current) {
			addCondition()
			setMode(modes[0]);
		}
	};
	const onBlurCondition: FocusEventHandler = (e) => {
		
	}
	const onClickCondition = (e: MouseEvent<HTMLButtonElement>, conditionIndex: number) => {
		e.preventDefault();
		const newRound = { ...localRound };
		newRound.turns[turnIdx].conditions[conditionIndex].checked = !newRound.turns[turnIdx].conditions[conditionIndex].checked;
		setContextRound(newRound);
		setMode(modes[2]);
	};
	const onChangeInitiative = (e: ChangeEvent<HTMLInputElement>) => {
		const newRound = { ...localRound };
		newRound.turns[turnIdx].initiative = +e.target.value;
		updateRound(newRound);
	};
	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		const newRound = { ...localRound };
		newRound.turns[turnIdx].name = e.target.value;
	}

	// Rendering
	const conditionInputs = () => {
		switch (mode) {
			case modes[0]:
				return (
					<Button
						bgColor="#feda79"
						border="solid 1px black"
						borderRadius="50%"
						alignSelf={"center"}
						margin="0"
						padding="0"
						size="xs"
						boxShadow={"2px 2px 0 black"}
						onClick={() => { setMode(modes[1]) }}
					>
						<SmallAddIcon
							fontSize={"1.5em"}
							margin="0"
							padding="0"
						/>
					</Button>
				)
			case modes[1]:
				return (
					<InputGroup
						variant='unstyled'
						border="solid 1px black"
						borderRadius="10px"
						bgColor="#feda79"
						onKeyDown={onKeyDownCondition}
						onBlur={onBlurConditionInput}
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
							/>
						</InputRightElement>
					</InputGroup>
				)
			case modes[2]:
				return (
					<Button
						bgColor="#feda79"
						border="solid 1px black"
						borderRadius="50%"
						alignSelf={"center"}
						margin="0"
						padding="0"
						size="xs"
						boxShadow={"2px 2px 0 black"}
						onClick={() => { setMode(modes[1]) }}
					>
						<DeleteIcon
							fontSize={"1.5em"}
							margin="0"
							padding="0"
						/>
					</Button>
				)
		}
	}

	return (
		<Box
			width="100%"
			maxWidth={listWidth}
			marginY="0.5rem">
			<Card
				bgColor={barColor}
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
						<Button
							key={idx}
							height="1.8em"
							width="auto"
							margin="0"
							color={"blacks"}
							paddingX="0.4rem"
							border="solid 1px black"
							borderRadius="10px"
							bgColor="#feda79"
							fontWeight={'semibold'}
							alignItems={"center"}
							onClick={(e) => onClickCondition(e, idx)}
							onBlur={onBlurCondition}
						>
							{mode == "delete condition" &&
								<Checkbox
									id={`checkbox-${turnIdx}-${idx}`}
									mr="0.2em"
									isChecked={condition.checked}></Checkbox>
							}
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
						</Button>
					))}
					{conditionInputs()}
				</Flex>
			}
		</Box>
	)
}