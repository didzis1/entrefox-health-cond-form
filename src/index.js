import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import FormContextProvider from './contexts/FormContext'

import {
	ThemeProvider,
	createMuiTheme,
	responsiveFontSizes
} from '@material-ui/core/styles'

import lime from '@material-ui/core/colors/lime'
import yellow from '@material-ui/core/colors/yellow'

let theme = createMuiTheme({
	palette: {
		primary: lime,
		secondary: yellow
	}
})

theme = responsiveFontSizes(theme)

ReactDOM.render(
	<FormContextProvider>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</FormContextProvider>,
	document.getElementById('root')
)
