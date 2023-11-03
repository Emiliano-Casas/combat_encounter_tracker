import { Button, Text, Box } from "@chakra-ui/react";
import { palette } from "../constants";

export function Footer() {
	return (
		<Box
			marginTop={"auto"}
			display="flex"
			justifyContent={"space-between"}
			alignItems={"center"}
			bg="#cce5e5"
			// zIndex={3}
			padding="1rem"
			borderTop="solid 0.1rem">
			<Button
				variant="outline">
				Clear
			</Button>
			{/* <Container> */}
				<Text>
					asdf
				</Text>
			{/* </Container> */}
			<Button
				minWidth="4rem" colorScheme="teal">
				Add
			</Button>
		</Box>
	)
}

