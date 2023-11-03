import { Button, Text, Container, Grid, GridItem } from "@chakra-ui/react";
import { palette } from "../constants";


export function Nav({ roundNum }: {
	roundNum: number
}) {
	return (
		<Container
			boxShadow="0px 5px 7px 0px rgba(0, 0, 0, 0.50);"
			bg={palette.dark_green}
			borderColor={palette.cadet_gray}
			borderBottomWidth="0.5rem"
			borderStyle="ridge"
			zIndex={3}
			padding="0.5rem">
			<Grid
				templateColumns={'1fr 1fr 1fr'}
				gridRowGap="1rem">
				<GridItem gridColumn={1}>
					<Button
						minWidth="4rem"
						colorScheme="blackAlpha"
						variant="solid" >Clear</Button>
				</GridItem>
				<GridItem gridColumn={3}
					display="flex"
					justifyContent="space-between">
					<Button
						minWidth="4rem"
						colorScheme="blackAlpha"
						variant="solid">Save</Button>
					<Button
						minWidth="4rem"
						colorScheme="blackAlpha"
						variant="solid">Load</Button>
				</GridItem>
				<GridItem
					gridColumn={2}
					display="flex"
					justifyContent={'center'}
					alignItems="end">
					<Text
						color="white"
						fontSize={"4xl"}
						fontWeight={"extrabold"}
						sx={{
							'-webkit-text-stroke-width': "0.05em",
							"-webkit-text-stroke-color": "black"
						}}>
						Round {roundNum}
					</Text>
				</GridItem>
				<GridItem
					gridColumn={3}
					display="flex"
					justifyContent="end"
					alignItems={"end"}>
					<Button
						minWidth="4rem" colorScheme="teal">Add</Button>
				</GridItem>
			</Grid>
		</Container>
	)
}

