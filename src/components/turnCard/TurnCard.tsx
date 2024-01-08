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
import { CardInput } from './CardInput';
import { CardLabel } from './CardLabel';

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
	const initMod = useRef<HTMLInputElement>(null);
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
		<Grid
			gridTemplateAreas={`"name name"
													"initiative hp"`}
			gridTemplateColumns={`1fr 1fr`}
			borderRadius="10px"
			border="1px"
			fontSize={'lg'}
			fontWeight="semibold"
			minHeight="3rem"
			bgColor={turn.maxHP > 0 ? palette.health_red : palette.light_purple}>

			{/* NAME & COPIES */}
			<GridItem
				area="name"
				display="flex">
				<OverlayedInput
					p={4}
					pe={2}
					flex={1}
					inputRef={nameInput}
					openEditButtons={editDisclosure.onOpen}>
					<CardInput
						placeholder='Name'
						textAlign={"center"}
						ref={nameInput}
						value={turn.name}
						onChange={onChangeName}
						borderBottom={`1px solid ${palette.edit_gray}`}
					/>
				</OverlayedInput>
				<OverlayedInput
					p={4}
					ps={2}
					inputRef={hpDiffInput}
					openEditButtons={editDisclosure.onOpen}
				>
					<CardLabel text="How many?" />
					<Input
						placeholder='#'
						width={12}
						ms={1}
						fontWeight={'semibold'}
						size="sm"
						bgColor={turn.maxHP > 0 ? palette.input_red : palette.input_purple}
						borderRadius={"lg"}
						border="1px"
						type='number'
						textAlign={"center"}
						ref={hpDiffInput}
						onKeyDown={onEnterHP}
					/>
				</OverlayedInput>
			</GridItem>

			{/* INITITIVE */}
			<GridItem
				area="initiative"
				display="flex"
				flexDir={"column"}
			>

				{/* RESULT */}
				<OverlayedInput
					inputRef={initInput}
					openEditButtons={editDisclosure.onOpen}>
					<Flex
						bgColor={turn.maxHP > 0 ? palette.input_red : palette.input_purple}
						ms={4}
						me={2}
						mt={2}
						px={6}
						py={6}
						borderTopRadius={"xl"}
						width="100%"
						position="relative"
						borderX={"1px"}
						borderTop={"1px"}
					>
						<Text
							px={2}
							lineHeight={'4'}
							borderX="1px"
							bg={`linear-gradient(0deg, ${turn.maxHP > 0 ? palette.input_red : palette.input_purple} 0%, ${turn.maxHP > 0 ? palette.health_red : palette.light_purple} 100%)`}
							position="absolute"
							top={-2}
						>Initiative</Text>
						<CardLabel text="Result:" />
						<CardInput
							ref={initInput}
							ms={2}
							type='number'
							placeholder={"initiative score"}
							id={`turn-${turnIdx}_initiative`}
							value={turn.initiative}
							onChange={onChangeInitiative} />
					</Flex>
				</OverlayedInput>

				{/* MODIFIER */}
				<OverlayedInput
					inputRef={initMod}
					openEditButtons={editDisclosure.onOpen}>
					<Flex
						bgColor={turn.maxHP > 0 ? palette.input_red : palette.input_purple}
						ms={4}
						me={2}
						mb={4}
						px={6}
						pb={6}
						borderBottomRadius={"xl"}
						width="100%"
						borderX={"1px"}
						borderBottom={"1px"}>
						<CardLabel text="Roll 1d20:" />
						<CardInput
							ms={2}
							type='number'
							placeholder='± modifier'
							ref={initMod}
							id={`turn-${turnIdx}_initiative`}
							value={turn.initMod}
							onChange={onChangeInitiative}
							borderBottom={`1px solid ${palette.edit_gray}`}
						/>
					</Flex>
				</OverlayedInput>
			</GridItem>

			{/* HP */}
			<GridItem
				area="hp"
				display="flex"
				flexDir="column">

				{/* CURRENT */}
				<OverlayedInput
					inputRef={hpInput}
					openEditButtons={editDisclosure.onOpen}>
					<Flex
						bgColor={turn.maxHP > 0 ? palette.input_red : palette.input_purple}
						me={4}
						ms={2}
						mt={2}
						px={6}
						py={6}
						borderTopRadius={"xl"}
						width="100%"
						position="relative"
						borderX={"1px"}
						borderTop={"1px"}>
						<Text
							px={2}
							lineHeight={'4'}
							borderX="1px"
							bg={`linear-gradient(0deg, ${turn.maxHP > 0 ? palette.input_red : palette.input_purple} 0%, ${turn.maxHP > 0 ? palette.health_red : palette.light_purple} 100%)`}
							position="absolute"
							top={-2}
						>Hit Points</Text>
						<CardLabel text="Current:" />
						<CardInput
							ms={2}
							type="number"
							placeholder='999'
							ref={hpInput}
							value={turn.hp}
							onKeyDown={onEnterHP}
						/>
					</Flex>
				</OverlayedInput>

				{/* MAX */}
				<OverlayedInput
					inputRef={hpInput}
					openEditButtons={editDisclosure.onOpen}>
					<Flex
						bgColor={turn.maxHP > 0 ? palette.input_red : palette.input_purple}
						me={4}
						ms={2}
						mb={4}
						px={6}
						pb={6}
						borderBottomRadius={"xl"}
						width="100%"
						borderX={"1px"}
						borderBottom={"1px"}>
						<CardLabel text="Max:" />
						<CardInput
							ms={2}
							type="number"
							placeholder='999'
							ref={hpInput}
							value={turn.hp}
							onKeyDown={onEnterHP}
						/>
					</Flex>
				</OverlayedInput>
			</GridItem>
		</Grid>
	)
}

const PlayMode = () => {
	return (
		<>
			<Text>Play mode</Text></>
	)
}