import {
	Flex,
	Input,
	Text,
	Button,
	InputGroup,
	InputRightElement,
	Checkbox,
} from '@chakra-ui/react';
import {
	useContext,
	useEffect,
	useRef,
	useState,
	KeyboardEventHandler,
	FocusEventHandler,
	MouseEvent
} from 'react';
import { Condition, Round } from '../constants'
import {
	SmallAddIcon,
	DeleteIcon,
	TimeIcon
} from '@chakra-ui/icons';
import { RoundContext } from "../RoundProvider";

export function ConditionsList({ turnIdx }: { turnIdx: number }) {
	const { round, setContextRound } = useContext(RoundContext);
	const conditions = round.turns[turnIdx].conditions;

	const DEFAULT_MODE = "default";
	const ADD_CONDITION_MODE = "add condition";
	const DELETE_CONDITION_MODE = "delete condition";

	const [mode, setMode] = useState(DEFAULT_MODE);
	const [localRound, setLocalRound] = useState(round);

	const condNameInput = useRef<HTMLInputElement>(null);
	const condCounterInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (condNameInput.current) {
			condNameInput.current.focus();
		}
	}, [mode]);

	const updateRound = (newRound: Round) => {
		setLocalRound(newRound);
		setContextRound(newRound);
	};

	const addCondition = () => {
		if (condNameInput.current && condNameInput.current.value.trim() !== '') {
			const newCond: Condition = { name: condNameInput.current.value.trim() };
			if (condCounterInput.current && +condCounterInput.current.value > 0) {
				newCond.roundCounter = +condCounterInput.current.value;
			}
			const newRound = { ...localRound };
			newRound.turns[turnIdx].conditions.push(newCond);
			updateRound(newRound);
		}
	}
	const onKeyDownCondition: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addCondition()
			setMode(DEFAULT_MODE);
		}
	};
	const onBlurConditionInput: FocusEventHandler<HTMLInputElement> = (e) => {
		if (e.relatedTarget !== condCounterInput.current && e.relatedTarget !== condNameInput.current) {
			addCondition()
			setMode(DEFAULT_MODE);
		}
	};
	const onBlurCondition: FocusEventHandler = (e) => {
		if (
			e.relatedTarget === null || (
				!e.relatedTarget.classList.contains(`turn-${turnIdx}_condition`) &&
				!e.relatedTarget.classList.contains(`turn-${turnIdx}_condition_delete`)
			)) {
			setMode(DEFAULT_MODE);
			const newRound = { ...localRound };
			const newConditions = newRound.turns[turnIdx].conditions;
			newRound.turns[turnIdx].conditions = newConditions.map((condition) => {
				condition.checked = false;
				return (condition);
			});
			updateRound(newRound);
		}
	}
	const onClickCondition = (e: MouseEvent<HTMLButtonElement>, conditionIndex: number) => {
		e.preventDefault();
		const newRound = { ...localRound };
		newRound.turns[turnIdx].conditions[conditionIndex].checked = !newRound.turns[turnIdx].conditions[conditionIndex].checked;
		updateRound(newRound);
		setMode(DELETE_CONDITION_MODE);
	};
	const onClickDeleteCondition = (e: MouseEvent<HTMLButtonElement>) => {
		const newRound = { ...localRound };
		const newConditions: Condition[] = new Array;
		newRound.turns[turnIdx].conditions.forEach((ele: Condition) => {
			if (!ele.checked) { newConditions.push(ele); }
		})
		newRound.turns[turnIdx].conditions = newConditions;
		updateRound(newRound);
		setMode(DEFAULT_MODE);
	}

	// Rendering
	const conditionInputs = () => {
		switch (mode) {
			case DEFAULT_MODE:
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
						onClick={() => { setMode(ADD_CONDITION_MODE) }}
					>
						<SmallAddIcon
							fontSize={"1.5em"}
							margin="0"
							padding="0"
						/>
					</Button>
				)
			case ADD_CONDITION_MODE:
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
			case DELETE_CONDITION_MODE:
				return (
					<Button
						className={`turn-${turnIdx}_condition_delete`}
						bgColor="#F0D0D0"
						border="solid 1px black"
						borderRadius="50%"
						alignSelf={"center"}
						margin="0"
						padding="0"
						size="xs"
						boxShadow={"2px 2px 0 black"}
						height="1.8rem"
						width="1.8rem"
						onClick={onClickDeleteCondition}
					>
						<DeleteIcon
							color="#9C3030"
							fontSize={"1.4em"}
							margin="0"
						/>
					</Button>
				)
		}
	}

	return (
		<Flex
			marginTop="0.38rem"
			justifyContent="center"
			flexWrap={"wrap"}
			gap={"0.3rem"}>
			{conditions.map((condition, idx) => (
				<Button
					key={idx}
					className={`turn-${turnIdx}_condition`}
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
							borderColor={"black"}
							color="black"
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
	)
}