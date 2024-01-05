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
	IconButton
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
import { OverlayedGridItem } from './OverlayedGridItem'

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
	const nameInput = useRef<HTMLInputElement>(null);
	const hpInput = useRef<HTMLInputElement>(null);
	const hpDiffInput = useRef<HTMLInputElement>(null);
	const copiesInput = useRef<HTMLInputElement>(null);

	const turn = localRound.turns[turnIdx];

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
		setEditMode(true);
	}
	const onBlurCardBody: FocusEventHandler = (e) => {
		if (!e.currentTarget.contains(e.relatedTarget)) {
			editButtons.onClose();
			setEditMode(false);
		}
	}

	// Rendering
	var gridTemplate: {
		templateAreas: string,
		gridTemplateRows: string,
		gridTemplateColumns: string
	} = {
		templateAreas: '',
		gridTemplateRows: '',
		gridTemplateColumns: ''
	}
	if (editMode) {
		gridTemplate.templateAreas = `"name copies"
																	"init hp"
																	"mod max"`;
		gridTemplate.gridTemplateRows = '1fr 1fr 1fr'
		gridTemplate.gridTemplateColumns = 'auto auto auto auto';
		// gridTemplate.templateAreas = `"init_label init name hp_label  hp"
		// 															"mod_label  mod  copies max_label max"`;
		// gridTemplate.gridTemplateRows = '1fr 1fr'
		// gridTemplate.gridTemplateColumns = 'auto auto auto auto auto';
	} else {
		gridTemplate.templateAreas = `"init name ${turn.maxHP > 0 ? 'hp hp_diff_b hp_diff' : ''}"`;
		gridTemplate.gridTemplateRows = '1fr'
		gridTemplate.gridTemplateColumns = `auto 5fr ${turn.maxHP > 0 ? 'auto auto auto' : ''}`;
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
				<Grid
					borderRadius="10px"
					boxShadow={"2px 2px 0 black"}
					fontSize={'lg'}
					fontWeight="semibold"
					minHeight="3rem"
					bgColor={turn.maxHP > 0 ? palette.health_red : palette.light_purple}
					templateAreas={gridTemplate.templateAreas}
					gridTemplateRows={gridTemplate.gridTemplateRows}
					gridTemplateColumns={gridTemplate.gridTemplateColumns}
				>

					<OverlayedGridItem
						area="name"
						inputRef={nameInput}
						openEditButtons={editButtons.onOpen}
						bgColor="lightblue"
					>
						<Input
							// bgColor="lightblue"

							marginX="0.25rem"
							placeholder='Name'
							fontSize={'lg'}
							fontWeight="semibold"
							border="none"
							variant={'unstyled'}
							borderRadius={"none"}
							ref={nameInput}
							value={turn.name}
							onChange={onChangeName}
							borderBottom={editMode ? `1px solid ${palette.edit_gray}` : 'none'}
						/>
					</OverlayedGridItem>

					<OverlayedGridItem
						area="init"
						inputRef={initInput}
						openEditButtons={editButtons.onOpen}
						bgColor="lightgreen">
						<label
							hidden={!editMode}>
							<Text
								color={palette.edit_gray}>
								Score:
							</Text>
						</label>
						<Input
							// bgColor="lightgreen"

							maxWidth="1.5rem"
							marginX="0.25rem"
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
							borderBottom={editMode ? `1px solid ${palette.edit_gray}` : 'none'}
						/>
					</OverlayedGridItem>

					{(turn.maxHP > 0 || editMode) &&
						<>
							<OverlayedGridItem
								inputRef={hpInput}
								openEditButtons={editButtons.onOpen}
								area="hp"
								bgColor="khaki">
								<label
									hidden={!editMode}>
									<Text
										color={palette.edit_gray}>HP:</Text>
								</label>
								<Input
									// bgColor="khaki"
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
									borderBottom={editMode ? '1px' : 'none'}
									fontSize={editMode ? 'lg' : '3xl'}
									value={turn.hp}
									onKeyDown={onEnterHP}
								/>
							</OverlayedGridItem>
							<OverlayedGridItem
								bgColor="orange"

								inputRef={hpDiffInput}
								openEditButtons={editButtons.onOpen}
								area="hp_diff"
								hidden={editMode}
							>
								<Input
									width={"3rem"}
									margin="0.25rem"
									paddingX="0.5em"
									fontWeight={'semibold'}
									size="sm"
									bgColor={"#E7B1B1"}
									border="none"
									borderRadius="8px"
									boxShadow={"2px 2px 0 black"}
									type='number'
									placeholder='ΔHP'
									ref={hpDiffInput}
									onKeyDown={onEnterHP}
								/>
							</OverlayedGridItem>

							<OverlayedGridItem
								bgColor="gray.300"

								inputRef={hpDiffInput}
								openEditButtons={editButtons.onOpen}
								area="copies"
								hidden={editMode}
							>
								<label>
									<Text
										color={palette.edit_gray}>asdfasdfasdf</Text>
								</label>
								<Input
									width={"3rem"}
									margin="0.25rem"
									paddingX="0.5em"
									fontWeight={'semibold'}
									size="sm"
									bgColor={"#E7B1B1"}
									border="none"
									borderRadius="8px"
									boxShadow={"2px 2px 0 black"}
									type='number'
									placeholder='ΔHP'
									ref={hpDiffInput}
									onKeyDown={onEnterHP}
								/>
							</OverlayedGridItem>
						</>
					}

					{false &&
						<>
							<GridItem area="mod_label">
								<label
									htmlFor={`turn-${turnIdx}_initMod`}>
									<Text
										// ml="0.5em"
										color={palette.edit_gray}>
										Roll:
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
						</>
					}

				</Grid>
			</Card>
			{turn.conditions.length > 0 &&
				<ConditionsList turnIdx={turnIdx} />
			}
		</Box >
	)
}

const editMode = () => {
	return (
		<Grid
					borderRadius="10px"
					boxShadow={"2px 2px 0 black"}
					fontSize={'lg'}
					fontWeight="semibold"
					minHeight="3rem"
					bgColor={turn.maxHP > 0 ? palette.health_red : palette.light_purple}
					templateAreas={gridTemplate.templateAreas}
					gridTemplateRows={gridTemplate.gridTemplateRows}
					gridTemplateColumns={gridTemplate.gridTemplateColumns}
				>

					<OverlayedGridItem
						area="name"
						inputRef={nameInput}
						openEditButtons={editButtons.onOpen}
						bgColor="lightblue"
					>
						<Input
							// bgColor="lightblue"

							marginX="0.25rem"
							placeholder='Name'
							fontSize={'lg'}
							fontWeight="semibold"
							border="none"
							variant={'unstyled'}
							borderRadius={"none"}
							ref={nameInput}
							value={turn.name}
							onChange={onChangeName}
							borderBottom={editMode ? `1px solid ${palette.edit_gray}` : 'none'}
						/>
					</OverlayedGridItem>

					<OverlayedGridItem
						area="init"
						inputRef={initInput}
						openEditButtons={editButtons.onOpen}
						bgColor="lightgreen">
						<label
							hidden={!editMode}>
							<Text
								color={palette.edit_gray}>
								Score:
							</Text>
						</label>
						<Input
							// bgColor="lightgreen"

							maxWidth="1.5rem"
							marginX="0.25rem"
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
							borderBottom={editMode ? `1px solid ${palette.edit_gray}` : 'none'}
						/>
					</OverlayedGridItem>

					{(turn.maxHP > 0 || editMode) &&
						<>
							<OverlayedGridItem
								inputRef={hpInput}
								openEditButtons={editButtons.onOpen}
								area="hp"
								bgColor="khaki">
								<label
									hidden={!editMode}>
									<Text
										color={palette.edit_gray}>HP:</Text>
								</label>
								<Input
									// bgColor="khaki"
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
									borderBottom={editMode ? '1px' : 'none'}
									fontSize={editMode ? 'lg' : '3xl'}
									value={turn.hp}
									onKeyDown={onEnterHP}
								/>
							</OverlayedGridItem>
							<OverlayedGridItem
								bgColor="orange"

								inputRef={hpDiffInput}
								openEditButtons={editButtons.onOpen}
								area="hp_diff"
								hidden={editMode}
							>
								<Input
									width={"3rem"}
									margin="0.25rem"
									paddingX="0.5em"
									fontWeight={'semibold'}
									size="sm"
									bgColor={"#E7B1B1"}
									border="none"
									borderRadius="8px"
									boxShadow={"2px 2px 0 black"}
									type='number'
									placeholder='ΔHP'
									ref={hpDiffInput}
									onKeyDown={onEnterHP}
								/>
							</OverlayedGridItem>

							<OverlayedGridItem
								bgColor="gray.300"

								inputRef={hpDiffInput}
								openEditButtons={editButtons.onOpen}
								area="copies"
								hidden={editMode}
							>
								<label>
									<Text
										color={palette.edit_gray}>asdfasdfasdf</Text>
								</label>
								<Input
									width={"3rem"}
									margin="0.25rem"
									paddingX="0.5em"
									fontWeight={'semibold'}
									size="sm"
									bgColor={"#E7B1B1"}
									border="none"
									borderRadius="8px"
									boxShadow={"2px 2px 0 black"}
									type='number'
									placeholder='ΔHP'
									ref={hpDiffInput}
									onKeyDown={onEnterHP}
								/>
							</OverlayedGridItem>
						</>
					}

					{false &&
						<>
							<GridItem area="mod_label">
								<label
									htmlFor={`turn-${turnIdx}_initMod`}>
									<Text
										// ml="0.5em"
										color={palette.edit_gray}>
										Roll:
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
						</>
					}

				</Grid>
	)
}