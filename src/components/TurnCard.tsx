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
	useDisclosure,
	CardFooter,
	InputGroup,
	InputLeftAddon,
	Spacer,
	Grid,
	GridItem
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

	const initInput = useRef<HTMLInputElement>(null);

	const turn = localRound.turns[turnIdx];
	const barColor = turn.hasOwnProperty("maxHP") ? palette.health_red : palette.light_purple;

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
	const onClickInitOverlay = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		editButtons.onOpen();
		if (initInput.current !== null) {
			initInput.current.focus();
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
			// position="relative"
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
				{/* <CardBody
					bgColor={barColor}
					borderRadius="10px"
					boxShadow={"2px 2px 0 black"}
					padding="0"
					fontSize={'lg'}
					fontWeight="semibold"
					paddingStart="0.5rem"
					display="flex"
					alignItems={"center"}
				> */}
				<Grid
					// padding="0"
					// paddingStart="0.5rem"
					bgColor={barColor}
					borderRadius="10px"
					boxShadow={"2px 2px 0 black"}
					fontSize={'lg'}
					fontWeight="semibold"
					templateAreas={editMode ?
						`"init_label init name hp_label  hp hp_diff"
						"mod_label  mod  copies max_label max"`
						:
						`"init name hp hp_diff"`}
					gridTemplateRows={editMode ? '1fr 1fr' : '1fr'}
					gridTemplateColumns={editMode ? '1fr 2fr 4fr 1fr 2fr' : '1fr 5fr 2fr 2fr'}
				>
					{/* <Box
						bgColor="black"
						height="100%"
						width="100%"
						position="absolute"
						opacity={0.5}
						zIndex={1}
						cursor="pointer">

					</Box> */}
					<GridItem area="init">
						<Box
							height="100%"
							width="100%"
							position="relative"
						>
							<Button
								// bgColor="black"
								// opacity="0.5"

								zIndex={1}
								position={"absolute"}
								height="100%"
								width="100%"
								cursor="pointer"
								variant={'unstyled'}
								onClick={onClickInitOverlay}
							/>
							<Input
								bgColor="lightgreen"
								// maxWidth="1.5em"
								// paddingStart={"0"}
								// marginX="0.25em"
								// paddingY="auto"
								// borderColor={"#4A5568"}
								ref={initInput}
								type='number'
								fontSize='lg'
								fontWeight="semibold"
								textAlign={"center"}
								border="none"
								variant={'unstyled'}
								borderRadius={"none"}
								id={`turn-${turnIdx}_initiative`}
								value={turn.initiative}
								onChange={onChangeInitiative}
								borderBottom={editMode ? `1px solid ${palette.edit_gray}` : 'none'}
							/>
						</Box>
					</GridItem>
					<GridItem area="name">
						<Input
							bgColor="lightblue"
							// paddingStart="0.25em"
							// marginY="0.5rem"
							// marginEnd="1rem"
							height="100%"
							placeholder='Name'
							fontSize={'lg'}
							fontWeight="semibold"
							border="none"
							variant={'unstyled'}
							borderRadius={"none"}
							value={turn.name}
							onChange={onChangeName}
							borderBottom={editMode ? `1px solid ${palette.edit_gray}` : 'none'}
						/>
					</GridItem>
					<GridItem
						area="hp"
					>
						<Input
							bgColor="khaki"
							// marginEnd={editMode ? "1rem" : "0.25rem"}
							// width="1.7em"
							// marginY="0.5rem"
							// marginStart="0.25rem"

							paddingEnd="0.25rem"
							fontWeight={'semibold'}
							textColor="#9C3030"
							textAlign={"right"}
							variant={'unstyled'}
							border="none"
							borderRadius={"none"}
							borderBottom={editMode ? '1px' : 'none'}
							fontSize={editMode ? 'lg' : '3xl'}
							value={turn.hp}
							onKeyDown={onEnterHP}
						/>
					</GridItem>
					<GridItem area="hp_diff"
						bgColor="orange"
						display={"flex"}
						justifyContent={"end"}
						alignItems={"center"}>
						{/* <Container
							// width="auto"

							paddingX="0"
							margin="0"
							display={"flex"}
							justifyContent={"end"}
							alignItems={"center"}
							> */}
						<Flex
							flexDir="column"
							justifyContent={"space-around"}
							alignItems={"center"}
							fontSize={"0.6em"}
							textColor="#9C3030"
							textOverflow={"ellipsis"}
						// hidden={editMode}
						>
							<Button
								padding="0"
								height="1rem"
								width="2em"
								fontSize="1em"
								variant="ghost"
								bgColor={addingHP ? "#E7B1B1" : "none"}
								onClick={() => setAddingHP(true)}>
								<AddIcon></AddIcon>
							</Button>
							<Button
								padding="0"
								width="2em"
								height="1rem"
								fontSize="1em"
								variant="ghost"
								bgColor={addingHP ? "none" : "#E7B1B1"}
								onClick={() => setAddingHP(false)}>
								<MinusIcon></MinusIcon>
							</Button>
						</Flex>
						<Input
							// marginStart="0.25rem"
							// marginEnd="0.5rem"
							// width={"3em"}

							margin="0.25rem"
							// height="100%"

							paddingX="0.5em"
							fontWeight={'semibold'}
							size="sm"
							bgColor={"#E7B1B1"}
							border="none"
							borderRadius="8px"
							boxShadow={"2px 2px 0 black"}
							type='number'
							placeholder='ΔHP'
							onKeyDown={onEnterHPDiff}
						// hidden={editMode}
						/>
						{/* </Container> */}
					</GridItem>



					{editMode &&
						<>
							<GridItem
								area="init_label">
								<label
									hidden={!editMode}>
									<Text
										// ml="0.5em"
										color={palette.edit_gray}>
										Initiative:
									</Text>
								</label>
							</GridItem>
							<GridItem area="hp_label">
								<label
									hidden={!editMode}>
									<Text
										color={palette.edit_gray}>HP:</Text>
								</label>
							</GridItem>
							<GridItem area="mod_label">
								<label
									htmlFor={`turn-${turnIdx}_initMod`}>
									<Text
										// ml="0.5em"
										color={palette.edit_gray}>
										Initiative modifier:
									</Text>
								</label>
							</GridItem>
							<GridItem area="mod">
								<Input
									// paddingStart={"0"}
									// marginX="0.25em"
									// maxWidth="1.5em"
									type='number'
									fontSize='lg'
									fontWeight="semibold"
									textAlign={"center"}
									border="none"
									variant={'unstyled'}
									borderRadius={"none"}
									borderColor={"#4A5568"}
									placeholder="0"
									id={`turn-${turnIdx}_initMod`}
									value={turn.initMod}
									onChange={onChangeInitiative}
									borderBottom={editMode ? `1px solid ${palette.edit_gray}` : 'none'}
								/>
							</GridItem>
							<GridItem area="max_label">
								<label
									hidden={!editMode}>
									<Text
										color={palette.edit_gray}>Max HP:</Text>
								</label>
							</GridItem>
							<GridItem area="max">
								<Input
									// marginEnd={editMode ? "1rem" : "0.25rem"}
									// width="1.7em"
									// padding="0"
									// marginY="0.5rem"
									// marginStart="0.25rem"
									fontWeight={'semibold'}
									textColor="#9C3030"
									textAlign={"right"}
									variant={'unstyled'}
									border="none"
									borderRadius={"none"}
									borderBottom={editMode ? '1px' : 'none'}
									fontSize={editMode ? 'lg' : '3xl'}
									value={turn.hp}
									onKeyDown={onEnterHP}
								/>
							</GridItem>
							<GridItem area="copies">
								<Flex
									flexDir="column"
									justifyContent={"space-around"}
									alignItems={"center"}
									fontSize={"0.6em"}
									textColor="#9C3030"
									textOverflow={"ellipsis"}
								>
									<Button
										fontSize="1em"
										variant="ghost"
										bgColor={addingHP ? "#E7B1B1" : "none"}
										onClick={() => setAddingHP(true)}>
										<AddIcon></AddIcon>
									</Button>
									<Button
										fontSize="1em"
										variant="ghost"
										bgColor={addingHP ? "none" : "#E7B1B1"}
										onClick={() => setAddingHP(false)}>
										<MinusIcon></MinusIcon>
									</Button>
								</Flex>
								<Input
									// height="100%"
									fontWeight={'semibold'}
									size="sm"
									bgColor={"#E7B1B1"}
									border="none"
									borderRadius="8px"
									boxShadow={"2px 2px 0 black"}
									type='number'
									placeholder='ΔHP'
									onKeyDown={onEnterHPDiff}
									hidden={editMode}
								/>
							</GridItem>
						</>
					}

				</Grid>
				{/* </CardBody> */}
			</Card>
			{turn.conditions.length > 0 &&
				<ConditionsList turnIdx={turnIdx} />
			}
		</Box >
	)
}