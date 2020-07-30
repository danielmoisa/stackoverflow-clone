import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { auth, db } from '../services/firebase';
import RightSidebar from '../components/RightSidebar';
import avatar from '../assets/avatar.png';

export default function Questions() {
	const classes = useStyles();

	const [data, setData] = useState({
		user: auth().currentUser,
		questions: [],
		content: '',
		readError: null,
		writeError: null,
	});

	useEffect(() => {
		function getQuestions() {
			db.collection('questions')
				.orderBy('timestamp', 'desc')
				.get()
				.then((querySnapshot) => {
					const questions = [];

					querySnapshot.forEach(function (doc) {
						questions.push({
							title: doc.data().title,
							content: doc.data().content,
							tags: doc.data().tags,
							username: doc.data().username,
							timestamp: doc.data().timestamp,
							uid: doc.data().uid,
							id: doc.id,
						});
					});

					setData({ ...data, questions: questions });
				})
				.catch(function (error) {
					console.log('Error getting documents: ', error);
				});
		}
		getQuestions();
	}, []);

	return (
		<Grid container className={classes.root}>
			<Grid item md={2}>
				<div className={classes.hideOnMobile}>
					<Sidebar />
				</div>
			</Grid>

			<Grid item md={7}>
				<Paper className={classes.questions} elevation={1}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							padding: '0 20px',
						}}>
						<Typography variant="h5">Top Questions</Typography>
						<Link to="/add-question">
							{' '}
							<Button
								variant="contained"
								color="primary"
								size="small">
								Add Question
							</Button>
						</Link>
					</div>

					{data.questions.map((question) => (
						<div key={question.id} className={classes.question}>
							<div style={{ width: '100%' }}>
								<Typography
									variant="subtitle1"
									color="primary"
									style={{ lineHeight: 1.5 }}>
									<Link
										to={{
											pathname: `/question/${question.id}`,
											state: {
												title: question.title,
												content: question.content,
												tags: question.tags,
												author: question.username,
												id: question.id,
											},
										}}>
										{question.title}
									</Link>
								</Typography>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}>
									<div>
										<Typography
											className={classes.tag}
											variant="caption">
											{question.tags}
										</Typography>
									</div>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
										}}>
										<div>
											<Typography variant="caption">
												asked by{' '}
												<Typography
													variant="caption"
													color="primary">
													{question.username}
												</Typography>
											</Typography>
										</div>
										<div>
											<img
												style={{
													height: 30,
													width: 30,
													marginRight: 5,
												}}
												src={avatar}
												alt="avatar"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</Paper>
			</Grid>

			<Grid item md={3}>
				<div className={classes.hideOnMobile}>
					<RightSidebar />
				</div>
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 10,
		[theme.breakpoints.up('lg')]: {
			padding: '0 13%',
		},
	},
	questions: {
		padding: '20px 0',
	},
	stats: {
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		margin: '5px 15px',
		fontSize: 10,
	},
	question: {
		display: 'flex',
		justifyContent: 'flex-start',
		padding: '10px 20px',
		borderBottom: '1px solid rgba(204, 204, 204, 0.5)',
		'&:last-child': {
			borderBottom: 'none',
		},
	},
	tag: {
		marginRight: 5,
		padding: '5px 7px',
		backgroundColor: '#e1ecf4',
		borderRadius: 2,
		color: '#0064bd',
	},
	hideOnMobile: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'block',
		},
	},
}));
