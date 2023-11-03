import { Button, Text, Box, Grid, GridItem, css, Container } from "@chakra-ui/react";
import { palette } from "../constants";

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
				maxWidth="40%"
				display="flex"
				justifyContent={"space-between"}
				alignItems={"center"}
			>
				<Button
					bg="white"
					border="solid 1 black"
					variant="outline"
					_after={{
						bg: "black",
						position: "absolute",
						content: '',
						top: "8px",
						left: "8px",
						right: "8px",
						bottom: "8px",
						zIndex:"-1"
					}}
				>
					Clear
				</Button>
				{/* <Container> */}
				<Text>
					Round {roundNum}
				</Text>
				{/* </Container> */}
				<Button
					minWidth="4rem" colorScheme="teal">
					Add
				</Button>
			</Box>
		</Box >
	)
}

