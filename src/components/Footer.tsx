import { Button, Text, Box } from "@chakra-ui/react";
import { listWidth } from "../constants";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import { FaSave, FaDownload } from 'react-icons/fa'
import { RoundContext } from "../RoundProvider";
import { useContext, Dispatch, SetStateAction } from "react";

export function Footer({ setAddedNewTurn }:
	{
		setAddedNewTurn: Dispatch<SetStateAction<boolean>>
	}) {
	const { round, setContextRound } = useContext(RoundContext);

	function addRound() {
		const newRound = { ...round };
		round.turns.push({
			initiative: 0, name: "", maxHP: 0, hp: 0, conditions: []
		});
		setContextRound(newRound);
		setAddedNewTurn(true);
	}

	return (
		<Box
			bg="#cce5e5"
			padding="1rem"
			paddingBottom={"0"}
			borderTop="solid 0.1rem"
			position="relative">
			<Box
				marginX="auto"
				maxWidth={listWidth}
				display="flex"
				justifyContent={"space-between"}
				alignItems={"center"}>
				<Button
					position="absolute"
					top="-1.5em"
					left="50%"
					transform="translate(-50%)"
					width="3em"
					height="3em"
					border="solid 1px black"
					borderRadius="50%"
					boxShadow={"4px 4px 0 black"}
					zIndex={1}
					onClick={addRound}>
					<AddIcon />
				</Button>
				<Button
					border="solid 1px black"
					borderRadius="16px"
					boxShadow={"4px 4px 0 black"}
					paddingX="0.7em"
					columnGap={"0.5em"}
					marginBottom="1rem"
				>
					<Icon
						as={FaDownload} />
					<Text>Load</Text>
				</Button>
				<Button
					width="4rem"
					fontSize="lg"
					variant="ghost"
					alignSelf={"end"}
					marginBottom={"0.2rem"}
				>
					<Icon
						as={DeleteIcon}></Icon>
				</Button>
				<Button
					border="solid 1px black"
					borderRadius="16px"
					boxShadow={"4px 4px 0 black"}
					paddingX="0.7em"
					columnGap={"0.5em"}
					marginBottom="1rem">
					<Icon
						as={FaSave} />
					<Text>Save</Text>
				</Button>
			</Box>
		</Box >
	)
}

