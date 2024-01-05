import {
	Box,
	Card,
	Flex,
	Input,
	Text,
	Button,
	Collapse,
	useDisclosure,
	Grid,
	GridItem,
	ButtonGroup,
	IconButton,
	UseDisclosureReturn
} from '@chakra-ui/react';
import {
	ChangeEvent,
	useContext,
	useState,
	KeyboardEventHandler,
	FocusEventHandler,
	MouseEvent,
	useRef
} from 'react';
import { listWidth, palette, Round } from '../../constants'
import {
	EditIcon,
	AddIcon,
	MinusIcon,
	SmallAddIcon,
} from '@chakra-ui/icons';
import { RoundContext } from "../../RoundProvider";
import { FaSave, FaDownload } from 'react-icons/fa'
import { ConditionsList } from '../ConditionsList'
import { OverlayedInput } from './OverlayedInput'

export function TurnCard({ turnIdx, initEditMode }: {
	turnIdx: number,
	initEditMode: boolean
}) {
	const { round, setContextRound } = useContext(RoundContext);
	const [editMode, setEditMode] = useState(initEditMode);
	const editDisclosure = useDisclosure();
	const turn = round.turns[turnIdx];

	const onClickEditButton = (e: MouseEvent<HTMLButtonElement>) => {
		setEditMode(true);
	}
	const onBlurCardBody: FocusEventHandler = (e) => {
		if (!e.currentTarget.contains(e.relatedTarget)) {
			editDisclosure.onClose();
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
				onClick={editDisclosure.onOpen}
				onBlur={onBlurCardBody}
			>
				<Collapse in={editDisclosure.isOpen} animateOpacity>
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
				{editMode ? <EditMode turnIdx={turnIdx} editDisclosure={editDisclosure} /> : <PlayMode />}
			</Card>
			{turn.conditions.length > 0 &&
				<ConditionsList turnIdx={turnIdx} />
			}
		</Box >
	)
}

const EditMode = ({ turnIdx, editDisclosure }: {
	turnIdx: number,
	editDisclosure: UseDisclosureReturn
}) => {

	const { round, setContextRound } = useContext(RoundContext);
	const [localRound, setLocalRound] = useState(round);
	const [addingHP, setAddingHP] = useState(false);
	const turn = localRound.turns[turnIdx];

	const initInput = useRef<HTMLInputElement>(null);
	const nameInput = useRef<HTMLInputElement>(null);
	const hpInput = useRef<HTMLInputElement>(null);
	const hpDiffInput = useRef<HTMLInputElement>(null);
	const copiesInput = useRef<HTMLInputElement>(null);

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
	const onChangeInitiative = (e: ChangeEvent<HTMLInputElement>) => {
		const newRound = { ...localRound };
		newRound.turns[turnIdx].initiative = +e.target.value;
		updateRound(newRound);
	};
	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		updateName(e.currentTarget.value)
	};

	return (
		<Box
			borderRadius="10px"
			boxShadow={"2px 2px 0 black"}
			fontSize={'lg'}
			fontWeight="semibold"
			minHeight="3rem"
			bgColor={turn.maxHP > 0 ? palette.health_red : palette.light_purple}>

			<Flex>
				<OverlayedInput
					bgColor="lightblue"

					padding={2}
					flex={1}
					inputRef={nameInput}
					openEditButtons={editDisclosure.onOpen}>
					<Input
						placeholder='Name'
						fontSize={'lg'}
						fontWeight="semibold"
						border="none"
						textAlign={"center"}
						variant={'unstyled'}
						borderRadius={"none"}
						ref={nameInput}
						value={turn.name}
						onChange={onChangeName}
						borderBottom={`1px solid ${palette.edit_gray}`}
					/>
				</OverlayedInput>

				<OverlayedInput
					bgColor="gray.300"
					padding={2}
					inputRef={hpDiffInput}
					openEditButtons={editDisclosure.onOpen}
				>
					<label>
						<Text
							whiteSpace={"nowrap"}
							color={palette.edit_gray}>How many?</Text>
					</label>
					<Input
						width={12}
						ms={1}
						fontWeight={'semibold'}
						size="sm"
						bgColor={"#E7B1B1"}
						border="none"
						borderRadius={"lg"}
						boxShadow={"2px 2px 0 black"}
						type='number'
						textAlign={"center"}
						placeholder='#'
						ref={hpDiffInput}
						onKeyDown={onEnterHP}
					/>
				</OverlayedInput>
			</Flex>

			<Flex
				bgColor="teal.500"
				flexDir={"column"}
			>
				<OverlayedInput
					bgColor="lightgreen"
					inputRef={initInput}
					openEditButtons={editDisclosure.onOpen}>
					<Flex
						bgColor="blue.300"
						mx={2}
						mt={2}
						px={6}
						py={4}
						borderTopRadius={"xl"}
						width="100%">
						<label>
							<Text
								color={palette.edit_gray}>
								Result:
							</Text>
						</label>
						<Input
							// maxWidth="1.5rem"
							// marginX="0.25rem"
							mx={2}
							type='number'
							fontSize='lg'
							fontWeight="semibold"
							textAlign={"center"}
							border="none"
							variant={'unstyled'}
							borderRadius={"none"}
							ref={initInput}
							id={`turn-${turnIdx}_initiative`}
							value={turn.initiative}
							onChange={onChangeInitiative}
							borderBottom={`1px solid ${palette.edit_gray}`}
						/>
					</Flex>
				</OverlayedInput>
				<OverlayedInput
					bgColor="orange"
					inputRef={initInput}
					openEditButtons={editDisclosure.onOpen}>
					<Flex
						bgColor="blue.300"
						mx={2}
						mb={2}
						px={6}
						py={4}
						borderBottomRadius={"xl"}
						width="100%">
						<label>
							<Text
								whiteSpace={"nowrap"}
								color={palette.edit_gray}>
								Roll 1d20:
							</Text>
						</label>
						<Input
							mx={2}
							type='number'
							fontSize='lg'
							fontWeight="semibold"
							textAlign={"center"}
							border="none"
							variant={'unstyled'}
							borderRadius={"none"}
							ref={initInput}
							id={`turn-${turnIdx}_initiative`}
							value={turn.initiative}
							onChange={onChangeInitiative}
							borderBottom={`1px solid ${palette.edit_gray}`}
						/>
					</Flex>
				</OverlayedInput>
			</Flex>

			<Flex>
				<OverlayedInput
					bgColor="khaki"
					inputRef={hpInput}
					openEditButtons={editDisclosure.onOpen}>
					<label>
						<Text
							color={palette.edit_gray}>Current:</Text>
					</label>
					<Input
						marginX="0.25rem"
						width="4rem"
						paddingEnd="0.25rem"
						fontWeight={'semibold'}
						textColor="#9C3030"
						textAlign={"right"}
						variant={'unstyled'}
						border="none"
						borderRadius={"none"}
						ref={hpInput}
						borderBottom={'1px'}
						fontSize={'lg'}
						value={turn.hp}
						onKeyDown={onEnterHP}
					/>
				</OverlayedInput>
				<OverlayedInput
					bgColor="teal.200"
					inputRef={hpInput}
					openEditButtons={editDisclosure.onOpen}>
					<label>
						<Text
							color={palette.edit_gray}>Max:</Text>
					</label>
					<Input
						marginX="0.25rem"
						width="4rem"
						paddingEnd="0.25rem"
						fontWeight={'semibold'}
						textColor="#9C3030"
						textAlign={"right"}
						variant={'unstyled'}
						border="none"
						borderRadius={"none"}
						ref={hpInput}
						borderBottom={'1px'}
						fontSize={'lg'}
						value={turn.hp}
						onKeyDown={onEnterHP}
					/>
				</OverlayedInput>
			</Flex>
		</Box>
	)
}

const PlayMode = () => {
	return (
		<>
			<Text>Play mode</Text></>
	)
}