import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { Button, ChakraBaseProvider, ChakraProvider, extendBaseTheme } from '@chakra-ui/react';
import { NotFound } from './components/NotFound.tsx';
import { InitiativeList } from './components/InitiativeList.tsx';

const router = createBrowserRouter([{
	path: "/",
	element: <App />,
	errorElement: <NotFound />,
	children: [{
		index: true,
		element: <InitiativeList />,
	}]
}]);

// const theme = extendBaseTheme({
// 	components: {
// 		Button,
// 		Badge,
// 	}
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	</React.StrictMode>,
)
