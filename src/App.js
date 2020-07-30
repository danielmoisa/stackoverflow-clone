import React from 'react';
import Routes from './services/routes';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './services/theme';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="app">
				<CssBaseline />
				<Routes />
			</div>
		</ThemeProvider>
	);
}

export default App;
