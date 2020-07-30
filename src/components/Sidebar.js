import React, { useState, useEffect } from 'react';
import { Typography, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PublicIcon from '@material-ui/icons/Public';
import { logOut } from '../services/firebase';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

export default function Sidebar() {
	const classes = useStyles();
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

	return (
		<div className={classes.sidebar}>
			<Typography className={classes.sidebar__link} variant="subtitle1">
				Home
			</Typography>
			<Typography className={classes.sidebar__link} variant="subtitle1">
				PUBLIC
			</Typography>
			<Typography className={classes.sidebar__active} variant="subtitle2">
				<Paper
					elevation={1}
					style={{
						padding: 5,
						fontWeight: 'bold',
						display: 'flex',
						alignItems: 'center',
					}}>
					<PublicIcon fontSize="small" style={{ marginRight: 5 }} />
					Stack Overflow
				</Paper>
			</Typography>
			<Typography className={classes.sidebar__small} variant="body2">
				Tags
			</Typography>
			<Typography className={classes.sidebar__small} variant="body2">
				Users
			</Typography>
			<Typography className={classes.sidebar__small} variant="body2">
				Jobs
			</Typography>
			<Typography className={classes.sidebar__link} variant="subtitle1">
				TEAMS
			</Typography>

			<div className={classes.sidebar__buttons}>
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
								style={{ marginRight: 5 }}
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
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	sidebar: {
		[theme.breakpoints.down('md')]: {
			padding: '0 20px',
		},
		margin: 5,
		marginTop: 33,
		display: 'flex',
		flexDirection: 'column',
		[theme.breakpoints.up('md')]: {
			justifyItems: 'flex-start',
		},
	},
	sidebar__link: {
		fontSize: 13,
		padding: 5,
	},
	sidebar__active: {
		backgroundColor: theme.palette.gray,
		borderRight: `2px solid ${theme.palette.secondary.main}`,
	},
	sidebar__small: {
		fontSize: 13,
		padding: 5,
		[theme.breakpoints.up('md')]: {
			marginLeft: 30,
		},
	},
	sidebar__buttons: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}));
