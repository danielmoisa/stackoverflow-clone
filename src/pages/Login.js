import React, { useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import logo from '../assets/logo.png';
import { login } from '../services/firebase';
import Paper from '@material-ui/core/Paper';

export default function Signup() {
	const classes = useStyles();

	const [input, setInput] = useState({
		error: null,
		email: '',
		password: '',
	});

	const handleChange = (event) => {
		setInput({
			...input,
			[event.target.name]: event.target.value,
		});
	};

	async function handleSubmit(event) {
		event.preventDefault();
		setInput({ error: '' });
		try {
			await login(input.email, input.password);
		} catch (error) {
			setInput({ error: error.message });
		}
		setInput({
			error: null,
			email: '',
			password: '',
		});
	}

	return (
		<Container className={classes.root}>
			<img
				src={logo}
				alt="logo"
				style={{
					height: 50,
					width: 50,
					display: 'block',
					margin: '0 auto',
					marginBottom: 10,
				}}
			/>
			<Paper elevation={3} className={classes.paper}>
				<form onSubmit={handleSubmit} className={classes.form}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email"
						name="email"
						type="email"
						autoComplete="email"
						onChange={handleChange}
						value={input.email}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
						value={input.password}
					/>

					{input.error ? <p>{input.error}</p> : null}

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						Log in
					</Button>
					<Grid container>
						<Grid item>
							<Link href="/signup" variant="body2">
								{'Dont have an account? Sign up'}
							</Link>
						</Grid>
					</Grid>
				</form>
			</Paper>
			<div style={{ marginTop: 30 }}>
				<Typography variant="subtitle2">
					Email: demo@gmail.com
				</Typography>
				<Typography variant="subtitle2">Password: demo1234</Typography>
			</div>
		</Container>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '90vh',
		[theme.breakpoints.up('sm')]: {
			padding: '0 5rem',
		},
	},
	iconText: {
		display: 'flex',
		alignItems: 'center',
		fontSize: 14,
		marginTop: 20,
		marginBottom: 20,
	},
	icon: {
		marginRight: 10,
		color: theme.palette.primary.main,
		fontSize: 26,
	},
	link: {
		color: theme.palette.primary.main,
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '40px 30px',
		borderRadius: 10,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));
