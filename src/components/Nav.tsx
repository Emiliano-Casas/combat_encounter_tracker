import { Button, Container, Flex, HStack, Spacer } from "@chakra-ui/react";

export function Nav() {
	return (
		<HStack width={'100%'} >
			<Button>Clear</Button>
			<Spacer></Spacer>
			<Button>Save</Button>
			<Button>Load</Button>
		</HStack>
	)
}