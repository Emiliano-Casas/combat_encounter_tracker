import './App.css';
import { Nav } from './components/Nav';
import { Box } from '@chakra-ui/react';
import { TurnList } from './components/TurnList';
import { Footer } from './components/Footer';
import { RoundProvider } from './RoundProvider';

function App() {
	return (
		<RoundProvider>
			<Box
				height="100vh"
				minWidth="100%"
				display="flex"
				flexDir={"column"}
				padding="0">
				<Nav />
				<TurnList />
				<Footer />
			</Box>
		</RoundProvider>
	)
}

export default App
