import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider, defineStyle, defineStyleConfig, extendTheme } from '@chakra-ui/react';

// const turnInput = defineStyle({
// 	_selected: {
// 		border: "none"
// 	}
// })
// const buttonTheme = defineStyleConfig({
// 	variants: { turnInput },
// })
// const theme = extendTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
)
