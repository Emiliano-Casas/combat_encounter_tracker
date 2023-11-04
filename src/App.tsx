import './App.css';
import { Nav } from './components/Nav';
import { Box } from '@chakra-ui/react';
import { Round } from "./constants"
import { TurnList } from './components/TurnList';
import { useState } from 'react';
import { Footer } from './components/Footer';

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
		{ initiative: 2, name: "name_4", hp: 14, conditions: [] },
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

	function updateRounds(newRounds: Round[]) {
		setRounds(newRounds);
	}
	function updateRoundNum(newRoundNum: number) {
		setRoundNum(newRoundNum);
	}

	return (
		<Box
			// bg="#f2e6f7"
			height="100vh"
			minWidth="100%"
			display="flex"
			flexDir={"column"}
			padding="0">
			<Nav
				roundNum={roundNum} />
			<TurnList
				rounds={rounds}
				updateRounds={updateRounds}></TurnList>
			<Footer/>
		</Box>
	)
}

export default App
