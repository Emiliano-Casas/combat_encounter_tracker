import './App.css';
import { Outlet } from 'react-router';
import { Nav } from './components/Nav';
import { Box, Container, VStack } from '@chakra-ui/react';
import { palette } from "./constants"

function App() {

  return (
    <Container>
			<Nav></Nav>
			<Outlet></Outlet>
    </Container>
  )
}

export default App
