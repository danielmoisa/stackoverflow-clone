import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: { light: '#96c2e8', main: '#0095ff', dark: '#0077cc' },
		secondary: { main: '#f48024' },
		gray: { light: '#e4e6e7', main: '#3d3d3d', dark: '#2d2d2d' },
		yellow: { main: '#fdf7e3', dark: '#fbf2d4' },
		type: 'light',
	},
});

export default theme;
