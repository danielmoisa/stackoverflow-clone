import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import { auth, db } from '../services/firebase';
import RightSidebar from '../components/RightSidebar';
import firebase from 'firebase';
import avatar from '../assets/avatar.png';
import Comments from '../components/Comments';

export default function Question(props) {
	const classes = useStyles();

	const [data, setData] = useState({
		user: auth().currentUser,
		answer: '',
		votes: 0,
		answers: [],
		readError: null,
		writeError: null,
	});

	async function fetchData() {
		try {
			await db
				.collection(`questions/${props.location.state.id}/answers`)
				.orderBy('timestamp', 'asc')
				.get()
				.then((onSnapshot) => {
					const answers = [];

					onSnapshot.forEach(function (doc) {
						answers.push({
							content: doc.data().answer,
							votes: doc.data().votes,
							username: doc.data().username,
							timestamp: doc.data().timestamp,
							uid: doc.data().uid,
							id: doc.id,
						});
					});

					setData({ ...data, answers: answers });
				});
		} catch (error) {
			console.log('Error getting documents: ', error);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	async function handleSubmitAnswers(event) {
		event.preventDefault();
		setData({ ...data, writeError: null });
		try {
			await db
				.collection('questions')
				.doc(props.location.state.id)
				.collection('answers')
				.add({
					answer: data.answer,
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
					uid: data.user.uid,
					username: data.user.email.substring(
						0,
						data.user.email.lastIndexOf('@')
					),
				});
			setData({ ...data, answer: '' });
			fetchData();
		} catch (error) {
			setData({ ...data, writeError: error.message });
		}
	}

	function handleChange(event) {
		setData({
			...data,
			[event.target.name]: event.target.value,
			alert: '',
		});
	}

	async function handleSubmitVoteUp(answerId) {
		try {
			await db
				.collection('questions')
				.doc(props.location.state.id)
				.collection('answers')
				.doc(answerId)
				.set(
					{
						votes: data.votes + 1,
					},
					{ merge: true }
				);

			fetchData();
		} catch (error) {
			setData({ ...data, writeError: error.message });
		}
	}

	async function handleSubmitVoteDown(answerId) {
		try {
			await db
				.collection('questions')
				.doc(props.location.state.id)
				.collection('answers')
				.doc(answerId)
				.set(
					{
						votes: data.votes - 1,
					},
					{ merge: true }
				);

			fetchData();
		} catch (error) {
			setData({ ...data, writeError: error.message });
		}
	}

	return (
		<Grid container className={classes.root}>
			<Grid item xs={12} md={2}>
				<div className={classes.hideOnMobile}>
					<Sidebar />
				</div>
			</Grid>

			<Grid item md={10}>
				<Paper
					elevation={1}
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '20px 10px',
						margin: '10px 0',
					}}>
					<Grid item md={10}>
						<Typography variant="h6">
							{props.location.state.title}
						</Typography>
					</Grid>
					<Grid item md={2}>
						<Link to="/add-question">
							<Button
								variant="contained"
								color="primary"
								size="medium">
								Add Question
							</Button>
						</Link>
					</Grid>
				</Paper>
				<Grid container>
					<Grid item md={8}>
						{' '}
						<Paper elevation={1}>
							<div className={classes.questions}>
								<Grid container>
									<Grid item md={1}>
										<div className={classes.stats}>
											<Typography variant="caption">
												{data.answers.length} <br />{' '}
												votes
											</Typography>
											<Typography
												style={{
													border: '1px solid #5fab76',
													borderRadius: 5,
													color: '#5fab76',
													marginTop: 3,
													marginBottom: 3,
												}}
												variant="caption">
												{data.answers.length} <br />{' '}
												answer
											</Typography>
											<Typography variant="caption">
												1 <br /> tag
											</Typography>
										</div>
									</Grid>
									<Grid
										item
										md={11}
										style={{ paddingLeft: 10 }}>
										<div>
											<div className={classes.question}>
												<div>
													<Typography
														style={{
															margin: '10px 0',
														}}
														variant="subtitle2">
														{
															props.location.state
																.content
														}
													</Typography>
													<div
														style={{
															display: 'flex',
															justifyContent:
																'space-between',
															alignItems:
																'center',
															marginTop: 10,
														}}>
														<div>
															<Typography
																className={
																	classes.tag
																}
																variant="caption">
																{
																	props
																		.location
																		.state
																		.tags
																}
															</Typography>
														</div>
														<div
															style={{
																display: 'flex',
																flexDirection:
																	'column',
															}}>
															<div>
																<Typography variant="caption">
																	asked by{' '}
																	<Typography
																		variant="caption"
																		color="primary">
																		{
																			props
																				.location
																				.state
																				.author
																		}
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
											<Comments
												commId={props.location.state.id}
											/>
										</div>
									</Grid>
								</Grid>
							</div>
							<div className={classes.answers}>
								<Typography variant="h6">Answers</Typography>
								{data.answers.map((answer) => {
									let answerId = answer.id;
									return (
										<div key={answer.id}>
											<div className={classes.answer}>
												<Grid container>
													<Grid item md={1}>
														<div
															className={
																classes.votes
															}>
															<Button
																onClick={() =>
																	handleSubmitVoteUp(
																		answerId
																	)
																}>
																<ArrowDropUpOutlinedIcon />
															</Button>

															<span
																style={{
																	fontWeight: 700,
																	fontSize: 18,
																}}>
																{answer.votes <
																	0 ||
																answer.votes ===
																	undefined
																	? 0
																	: answer.votes}
															</span>
															<Button
																onClick={() =>
																	handleSubmitVoteDown(
																		answerId
																	)
																}>
																<ArrowDropDownOutlinedIcon />
															</Button>
														</div>
													</Grid>
													<Grid
														item
														md={11}
														style={{
															paddingLeft: 10,
															paddingTop: 20,
														}}>
														<div>
															<Typography variant="body2">
																{answer.content}
															</Typography>
														</div>
													</Grid>
												</Grid>
											</div>
										</div>
									);
								})}
							</div>

							<div className={classes.addAnswer}>
								<Typography variant="h6">
									Your Answer
								</Typography>
								<form onSubmit={handleSubmitAnswers}>
									<TextField
										onChange={handleChange}
										name="answer"
										value={data.content}
										placeholder="Add an answer to Stack Overflow!"
										fullWidth
										margin="normal"
										InputLabelProps={{
											shrink: true,
										}}
										variant="filled"
										multiline
										rows={6}
										required
									/>

									<Button
										color="primary"
										variant="contained"
										size="medium"
										type="submit"
										style={{
											marginTop: 10,
										}}>
										Post your question
									</Button>
								</form>
							</div>
						</Paper>
					</Grid>
					<Grid item md={4}>
						<div className={classes.hideOnMobile}>
							<RightSidebar />
						</div>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.up('lg')]: {
			padding: '0 13%',
		},
	},
	stats: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
	},
	questions: {
		padding: 20,
	},
	question: {
		paddingBottom: 20,
		marginLeft: 10,
	},
	tag: {
		marginRight: 5,
		padding: '5px 7px',
		backgroundColor: '#e1ecf4',
		borderRadius: 2,
		color: '#0064bd',
	},
	answers: {
		padding: 20,
	},
	answer: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderBottom: '1px solid rgba(204, 204, 204, 0.5)',
		padding: '10px 0',
	},
	votes: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		lineHeight: 0.5,
	},
	addAnswer: {
		padding: 20,
	},
	hideOnMobile: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'block',
		},
	},
}));
