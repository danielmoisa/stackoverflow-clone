import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../assets/logo.png';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import firebase from 'firebase';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import { logOut } from '../services/firebase';

function Header() {
	const classes = useStyles();
	const [sidebar, setSidebar] = useState(false);
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				setIsLogged(true);
			} else {
				setIsLogged(false);
			}
		});
	}, []);

	const toggleDrawer = (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setSidebar(!sidebar);
	};

	return (
		<div className={classes.grow}>
			<Drawer open={sidebar} onClose={toggleDrawer}>
				<Sidebar />
			</Drawer>
			<AppBar color="transparent" position="static" elevation={1}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
						onClick={toggleDrawer}>
						<MenuIcon />
					</IconButton>
					<Link to="/">
						{' '}
						<img
							className={classes.logoImg}
							src={logo}
							alt="StackOverflow"
						/>
						<Typography className={classes.logo} variant="h6">
							stack
							<span style={{ fontWeight: 600 }}>overflow</span>
						</Typography>
					</Link>
					<div className={classes.menu}>
						<Typography
							className={classes.title}
							variant="subtitle1"
							noWrap>
							Products
						</Typography>
					</div>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
					{isLogged ? (
						<Button
							className={classes.loginBtn}
							onClick={logOut}
							variant="contained"
							color="primary"
							size="small">
							Log out
						</Button>
					) : (
						<div style={{ display: 'flex' }}>
							<Link to="/login">
								{' '}
								<Button
									className={classes.loginBtn}
									variant="contained"
									color="primary"
									size="small">
									Log in
								</Button>
							</Link>

							<Link to="/signup">
								<Button
									className={classes.signupBtn}
									variant="contained"
									color="primary"
									size="small">
									Sign up
								</Button>
							</Link>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
		zIndex: 90,
	},
	menuButton: {
		display: 'block',
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	logoImg: {
		width: 30,
		height: 30,
	},
	logo: {
		marginLeft: 5,
	},
	menu: {
		marginLeft: 20,
		marginRight: 20,
		display: 'flex',
		flexDirection: 'row',
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'block',
			marginLeft: 10,
			marginRight: 10,
			color: theme.palette.grey.main,
			fontSize: 14,
		},
	},
	search: {
		position: 'relative',
		border: `1px solid ${theme.palette.gray.light}`,
		borderRadius: theme.shape.borderRadius,
		'&:hover': {
			backgroundColor: fade(theme.palette.gray.light, 0.2),
		},
		marginRight: theme.spacing(4),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
	},
	loginBtn: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			marginRight: 5,
			width: 130,
			padding: '10px 0',
			fontSize: 13,
			textTransform: 'none',
			display: 'block',
		},
	},
	signupBtn: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			marginRight: 5,
			marginLeft: 5,
			width: 130,
			padding: '10px 0',
			fontSize: 13,
			textTransform: 'none',
			display: 'block',
			backgroundColor: theme.palette.primary.dark,
		},
	},
	toolbar: {
		borderTop: '3px solid #f48024',
		[theme.breakpoints.up('lg')]: {
			padding: '15px 13%',
		},
	},
}));

export default Header;
