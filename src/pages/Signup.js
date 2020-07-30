import React, { useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import logo from '../assets/logo.png';
import { signup } from '../services/firebase';
import Paper from '@material-ui/core/Paper';

export default function Login() {
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
			await signup(input.email, input.password);
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
			<Grid container>
				<Grid
					item
					sm={7}
					style={{
						paddingTop: 50,
						paddingBottom: 50,
						paddingLeft: 50,
					}}>
					<Typography variant="h5" size="">
						Join the Stack Overflow community
					</Typography>
					<Typography className={classes.iconText} variant="body1">
						<QuestionAnswerIcon className={classes.icon} />
						Get unstuck - ask a question
					</Typography>
					<Typography className={classes.iconText} variant="body1">
						<ImportExportIcon className={classes.icon} />
						Unlock new privileges like voting and commenting
					</Typography>
					<Typography className={classes.iconText} variant="body1">
						<LocalOfferIcon className={classes.icon} />
						Save your favorite tags, filters and jobs
					</Typography>
					<Typography className={classes.iconText} variant="body1">
						<EmojiEventsIcon className={classes.icon} />
						Earn reputation and badges
					</Typography>
					<Typography variant="caption">
						Use the power of Stack Overflow insde your organization.
						<br />
						<a className={classes.link} href="#">
							Try a free trial of Stack Overflow for teams.
						</a>
					</Typography>
				</Grid>
				<Grid item sm={5}>
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
								autoFocus
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
								Sign up
							</Button>
							<Grid container>
								<Grid item>
									<Link to="/login" variant="body2">
										{'Already have an account? Log in'}
									</Link>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '90vh',
		[theme.breakpoints.up('md')]: {
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
		padding: '20px 30px',
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
