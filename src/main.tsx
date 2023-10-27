import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react';

// const theme = extendBaseTheme({
// 	components: {
// 		Button,
// 		Badge,
// 	}
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<App/>
		</ChakraProvider>
	</React.StrictMode>,
)
