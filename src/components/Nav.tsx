import { Button, Text, Box, Heading } from "@chakra-ui/react";
import { palette } from "../constants";
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

export function Nav({ roundNum }: {
	roundNum: number
}) {
	return (
		<Box
			bg="#cce5e5"
			padding="1rem"
			borderBottom="solid 0.1rem">
			<Box
				marginX="auto"
				maxWidth="640px"
				display="flex"
				justifyContent={"space-between"}
				alignItems={"center"}
			>
				<Button
					border="solid 1px black"
					borderRadius="16px"
					boxShadow={"4px 4px 0 black"}
				>
					<ArrowBackIcon
						boxSize={5} />
				</Button>
				<Heading>
					Round {roundNum}
				</Heading>
				<Button
					border="solid 1px black"
					borderRadius="16px"
					boxShadow={"4px 4px 0 black"}>
					<ArrowForwardIcon
						boxSize={5} />
				</Button>
			</Box>
		</Box >
	)
}

