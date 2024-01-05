import './App.css';
import { Nav } from './components/Nav';
import { Box, theme } from '@chakra-ui/react';
import { TurnList } from './components/TurnList';
import { Footer } from './components/Footer';
import { RoundProvider } from './RoundProvider';
import { useState } from 'react';

function App() {
	const [addedNewTurn, setAddedNewTurn] = useState(false);
	console.log(theme);
	return (
		<RoundProvider>
			<Box
				height="100vh"
				minWidth="100%"
				display="flex"
				flexDir={"column"}
				padding="0">
				<Nav />
				<TurnList addedNewTurn={addedNewTurn} />
				<Footer setAddedNewTurn={setAddedNewTurn} />
			</Box>
		</RoundProvider>
	)
}

export default App
