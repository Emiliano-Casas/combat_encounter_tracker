import './App.css';
import { Nav } from './components/Nav';
import { Container } from '@chakra-ui/react';
import { palette, Round } from "./constants"
import { TurnList } from './components/TurnList';
import { useState } from 'react';

const savedRound1: Round = {
	id: "asdf",
	turns: [
		{
			initiative: 33, name: "name_1", hp: 14, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }
			]
		},
		{ initiative: 1, name: "name_2", hp: null, conditions: [] },
		{
			initiative: 7, name: "name_3", hp: null, conditions: [
				{ name: "condition_1", roundCounter: 3 },
				{ name: "condition_2", roundCounter: 2 },
				{ name: "condition_3" }]
		},
		{ initiative: 2, name: "name_4", hp: 14, conditions: [] }
	]
};

function App() {
	const [rounds, setRounds] = useState<Round[]>([savedRound1]);
	const [roundNum, setRoundNum] = useState(1);

	console.log("App");
	console.log(rounds.length);

	function updateRounds(newRounds: Round[]) {
		setRounds(newRounds);
	}
	function updateRoundNum(newRoundNum: number) {
		setRoundNum(newRoundNum);
	}

	return (
		<Container
			height="100vh"
			display="flex"
			flexDir={"column"}
			bg={palette.lion1}
			padding="0"
			borderTop="0.5rem"
			borderX="0.5rem"
			borderStyle="ridge"
			borderColor={palette.cadet_gray}>
			<Nav
				roundNum={roundNum} />
			<TurnList
				rounds={rounds}
				updateRounds={updateRounds}></TurnList>
		</Container>
	)
}

export default App
