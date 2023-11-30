import {
	Box,
	Card,
	CardBody,
	Flex,
	Input,
	Text,
	Container,
	Button,
	Collapse,
	useDisclosure
} from '@chakra-ui/react';
import {
	ChangeEvent,
	useContext,
	useState,
	KeyboardEventHandler,
	FocusEventHandler,
	MouseEvent
} from 'react';
import { listWidth, palette, Round } from '../constants'
import {
	EditIcon,
	AddIcon,
	MinusIcon,
	SmallAddIcon,
} from '@chakra-ui/icons';
import { RoundContext } from "../RoundProvider";
import { FaSave, FaDownload } from 'react-icons/fa'
import { ConditionsList } from './ConditionsList'

export function TurnCard({ turnIdx, initEditMode }: {
	turnIdx: number,
	initEditMode: boolean
}) {
	const { round, setContextRound } = useContext(RoundContext);

	const [localRound, setLocalRound] = useState(round);
	const [addingHP, setAddingHP] = useState(false);
	const [editMode, setEditMode] = useState(initEditMode);
	const editButtons = useDisclosure();

	const turn = localRound.turns[turnIdx];
	const barColor = turn.hasOwnProperty("maxHP") ? "#F0D0D0" : "#E7D0F0";

	const updateRound = (newRound: Round) => {
		setLocalRound(newRound);
		setContextRound(newRound);
	};
	const updateName = (newName: string) => {
		const newRound = { ...localRound };
		newRound.turns[turnIdx].name = newName;
		updateRound(newRound);
	}
	const updateHP = (newHP: number) => {
		const newRound = { ...localRound };
		newRound.turns[turnIdx].hp = newHP;
		updateRound(newRound);
	}

	// Event handlers
	const onEnterHP: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			updateHP(+e.currentTarget.value)
		}
	}
	const onEnterHPDiff: KeyboardEventHandler<HTMLInputElement> = (e) => {
		let diff = +e.currentTarget.value;
		const hp = localRound.turns[turnIdx].hp;
		if (e.key === 'Enter' && diff !== 0 && hp !== undefined) {
			if (!addingHP) {
				diff = diff * -1;
			}
			if (hp + diff >= 0) {
				updateHP(hp + diff);
			} else {
				updateHP(0);
			}
		}
	};
	const onChangeInitiative = (e: ChangeEvent<HTMLInputElement>) => {
		const newRound = { ...localRound };
		newRound.turns[turnIdx].initiative = +e.target.value;
		updateRound(newRound);
	};
	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		updateName(e.currentTarget.value)
	};
	const onClickEditButton = (e: MouseEvent<HTMLButtonElement>) => {
		// editButtons.onClose();
		setEditMode(true);
	}
	const onBlurCardBody: FocusEventHandler = (e) => {
		if (!e.currentTarget.contains(e.relatedTarget)) {
			editButtons.onClose();
			setEditMode(false);
		}
	}

	return (
		<Box
			width="100%"
			maxWidth={listWidth}
			marginY="0.5rem"
		>
			<Card
				boxShadow={"none"}
				onClick={editButtons.onOpen}
				onBlur={onBlurCardBody}
			>
				<Collapse in={editButtons.isOpen} animateOpacity>
					<Box
						textAlign={"right"}>
						<Button
							bgColor={"white"}
							borderBottom="1px"
							borderBottomRadius={"0"}
							marginRight="0.5rem">
							<FaDownload
								margin="0"
								padding="0"
							/>
							<Text
								ml="0.3em">Save</Text>
						</Button>
						<Button
							bgColor={"white"}
							borderBottom="1px"
							borderBottomRadius={"0"}
							marginRight="0.5rem">
							<FaSave
								margin="0"
								padding="0"
							/>
							<Text
								ml="0.3em">Load</Text>
						</Button>
						<Button
							bgColor={"white"}
							borderBottom="1px"
							borderBottomRadius={"0"}
							marginRight="0.5rem">
							<SmallAddIcon
								fontSize={"1.5em"}
								margin="0"
								padding="0"
							/>
							<Text>Condition</Text>
						</Button>
						<Button
							bgColor={"white"}
							borderBottom="1px"
							borderBottomRadius={"0"}
							marginRight="0.5rem"
							onClick={onClickEditButton}>
							<EditIcon></EditIcon>
							<Text
								ml="0.3em">Edit</Text>
						</Button>
					</Box>
				</Collapse>
				<CardBody
					bgColor={barColor}
					borderRadius="10px"
					boxShadow={"2px 2px 0 black"}
					padding="0"
					display="flex"
					alignItems={"center"}
					fontSize={'lg'}
					fontWeight="semibold"
					paddingStart="0.5rem">
					<label
						hidden={!editMode}>
						<Text color={palette.edit_gray}>Initiative:</Text>
					</label>
					<Input
						id={`turn-${turnIdx}_initiative`}
						type='number'
						fontSize='lg'
						fontWeight="semibold"
						textAlign={"center"}
						maxWidth="1.5em"
						paddingStart={"0"}
						marginX="0.25em"
						border="none"
						variant={'unstyled'}
						borderRadius={"none"}
						borderColor={"#4A5568"}
						value={turn.initiative}
						onChange={onChangeInitiative}
						borderBottom={editMode ? '1px' : 'none'}
					/>
					<Input
						placeholder='Name'
						fontSize={'lg'}
						fontWeight="semibold"
						paddingStart="0.25em"
						marginY="0.5rem"
						marginEnd="0.25em"
						border="none"
						variant={'unstyled'}
						borderRadius={"none"}
						value={turn.name}
						onChange={onChangeName}
						borderBottom={editMode ? '1px' : 'none'}
					/>
					{turn.hasOwnProperty("maxHP") &&
						<Container
							display={"flex"}
							justifyContent={"end"}
							alignItems={"center"}
							paddingX="0"
							margin="0"
							width="auto">
							<label
								hidden={!editMode}>
								<Text color={palette.edit_gray}>HP:</Text>
							</label>
							<Input
								fontSize={'3xl'}
								fontWeight={'semibold'}
								textColor="#9C3030"
								width="1.7em"
								padding="0"
								marginY="0.5rem"
								marginX="0.25em"
								textAlign={"right"}
								variant={'unstyled'}
								border="none"
								borderRadius={"none"}
								onKeyDown={onEnterHP}
								value={turn.hp}
								borderBottom={editMode ? '1px' : 'none'}
							/>
							<Flex
								flexDir="column"
								justifyContent={"space-around"}
								alignItems={"center"}
								fontSize={"0.6em"}
								textColor="#9C3030"
								textOverflow={"ellipsis"}
								hidden={editMode}>
								<Button
									padding="0"
									fontSize="1em"
									height="1rem"
									variant="ghost"
									bgColor={addingHP ? "#E7B1B1" : "none"}
									width="2em"
									onClick={() => setAddingHP(true)}>
									<AddIcon></AddIcon>
								</Button>
								<Button
									padding="0"
									fontSize="1em"
									height="1rem"
									variant="ghost"
									bgColor={addingHP ? "none" : "#E7B1B1"}
									width="2em"
									onClick={() => setAddingHP(false)}>
									<MinusIcon></MinusIcon>
								</Button>
							</Flex>
							<Input
								fontWeight={'semibold'}
								size="sm"
								width={"3em"}
								bgColor={"#E7B1B1"}
								border="none"
								borderRadius="8px"
								boxShadow={"2px 2px 0 black"}
								type='number'
								paddingX="0.5em"
								marginX="0.5rem"
								placeholder='ΔHP'
								onKeyDown={onEnterHPDiff}
								hidden={editMode}
							/>
						</Container>
					}
				</CardBody>
			</Card>
			{turn.conditions.length > 0 &&
				<ConditionsList turnIdx={turnIdx} />
			}
		</Box >
	)
}