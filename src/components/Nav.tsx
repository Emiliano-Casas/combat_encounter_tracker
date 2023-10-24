import { Button, Text, Container, Flex, Grid, GridItem, HStack, Spacer } from "@chakra-ui/react";
import { palette } from "../constants";

export function Nav() {
	return (
		<Container  boxShadow="0px 10px 15px 0px rgba(0, 0, 0, 0.50);">
			<HStack>
				<Button>Clear</Button>
				<Spacer></Spacer>
				<Button>Save</Button>
				<Button>Load</Button>
			</HStack>
			<Grid templateColumns={'1fr 1fr 1fr'} marginBottom={2}>
				<GridItem gridColumn={2} display="flex" justifyContent={'center'}>
					<Text>Round 5</Text>
				</GridItem>
				<GridItem gridColumn={3} display="flex" justifyContent="end">
					<Button>Add</Button>
				</GridItem>
			</Grid>
		</Container>
	)
}