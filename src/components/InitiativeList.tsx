import { Box, Text, Container, Stack, Grid, Button, GridItem, Card, CardBody, Heading } from "@chakra-ui/react";

export function InitiativeList() {
	const turns = [{ init: 3 }, { init: 1 }, { init: 2 }]

	return (
		<Stack backgroundColor={'tomato'} spacing={0}>
			<Grid templateColumns={'1fr 1fr 1fr'}>
				<GridItem bg={'purple.300'} gridColumn={2} display="flex" justifyContent={'center'}>
					<Text>Round 5</Text>
				</GridItem>
				<GridItem bg={'green.300'} gridColumn={3} display="flex" justifyContent="end">
					<Button>Add</Button>
				</GridItem>
			</Grid>
			<Stack>
				{turns.map((turn) => (
					<Card bg='blue.300'>
						<CardBody>
							<Text>{turn.init}</Text>
							<Text>View a summary of all your customers over the last month.</Text>
						</CardBody>
					</Card>
				))}
			</Stack>
		</Stack>
	)
}