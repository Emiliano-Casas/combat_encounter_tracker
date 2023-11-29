import { Button, Box, Heading } from "@chakra-ui/react";
import { listWidth } from "../constants";
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useContext } from "react";
import { RoundContext } from "../RoundProvider";

export function Nav() {
	const { round} = useContext(RoundContext);
	return (
		<Box
			bg="#cce5e5"
			padding="1rem"
			borderBottom="solid 0.1rem">
			<Box
				marginX="auto"
				maxWidth={listWidth}
				display="flex"
				justifyContent={"space-between"}
				alignItems={"center"}
			>
				<Button
					border="solid 1px black"
					borderRadius="16px"
					boxShadow={"4px 4px 0 black"}
					paddingX="0.7em"
				>
					<ArrowBackIcon
						boxSize={5} />
				</Button>
				<Heading>
					Round {round.roundNum}
				</Heading>
				<Button
					border="solid 1px black"
					borderRadius="16px"
					boxShadow={"4px 4px 0 black"}
					paddingX="0.7em">
					<ArrowForwardIcon boxSize={5} />
				</Button>
			</Box>
		</Box >
	)
}

