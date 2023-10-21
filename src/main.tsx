import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { ChakraBaseProvider } from '@chakra-ui/react';
import { NotFound } from './components/NotFound.tsx';
import { InitiativeList } from './components/InitiativeList.tsx';

const router = createBrowserRouter([{
	path: "/",
	element: <App />,
	errorElement: <NotFound />,
	children: [{
		index: true,
		element: <InitiativeList />,
	},
	// {
	// 	path: "/item/:itemID",
	// 	element: <Item />
	// }
	]
}]);


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraBaseProvider>
			<RouterProvider router={router} />
		</ChakraBaseProvider>
	</React.StrictMode>,
)
