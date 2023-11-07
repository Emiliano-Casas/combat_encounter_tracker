import { Button, Text, Box } from "@chakra-ui/react";
import { palette } from "../constants";
import { listWidth } from "../constants";
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import { FaSave, FaDownload } from 'react-icons/fa'


export function Footer() {
	return (
		<Box
			bg="#cce5e5"
			padding="1rem"
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
					boxShadow={"4px 4px 0 black"}>
					<AddIcon
					/>
				</Button>
				<Button
					border="solid 1px black"
					borderRadius="16px"
					boxShadow={"4px 4px 0 black"}
					paddingX="0.7em"
					columnGap={"0.5em"}>
					<Icon
						as={FaDownload} />
					<Text>Load</Text>
				</Button>
				<Button
					width="4rem"
					fontSize="lg"
					variant="ghost"
					padding={"0"}
					alignSelf={"end"}>
					<Icon
						as={DeleteIcon}></Icon>
				</Button>
				<Button
					border="solid 1px black"
					borderRadius="16px"
					boxShadow={"4px 4px 0 black"}
					paddingX="0.7em"
					columnGap={"0.5em"}>
					<Icon
						as={FaSave} />
					<Text>Save</Text>
				</Button>
			</Box>
		</Box >
	)
}

