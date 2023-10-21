import './App.css';
import { Outlet } from 'react-router';
import { Nav } from './components/Nav';
import { Box, VStack } from '@chakra-ui/react';

function App() {

  return (
    <>
			<Nav></Nav>
			<Outlet></Outlet>
    </>
  )
}

export default App
