import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { db } from '../services/firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
	Container,
	Paper,
	Grid,
	TextField,
	Button,
	Typography,
} from '@material-ui/core';
import ask from '../assets/ask.svg';
import AddQuestionSidebar from '../components/AddQuestionSidebar';
import firebase from 'firebase';

export default function AddQuestion() {
	const classes = useStyles();
	const [data, setData] = useState({
		user: auth().currentUser,
		questions: [],
		title: '',
		content: '',
		tags: '',
		readError: null,
		writeError: null,
	});

	async function handleSubmit(event) {
		event.preventDefault();
		setData({ ...data, writeError: null });
		try {
			await db
				.collection('questions')
				.doc()
				.set({
					title: data.title,
					content: data.content,
					tags: data.tags,
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
					uid: data.user.uid,
					username: data.user.email.substring(
						0,
						data.user.email.lastIndexOf('@')
					),
				});
			setData({ ...data, title: '', content: '', tags: '' });
			window.location.href = '/';
		} catch (error) {
			setData({ ...data, writeError: error.message });
		}
	}

	function handleChange(event) {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	}

	return (
		<Container>
			<div className={classes.header}>
				<Typography variant="h4">Ask a public question</Typography>
				<img src={ask} alt="ask" style={{ width: '30vw' }} />
			</div>
			<Grid container>
				<Grid item sm={9}>
					<Paper style={{ padding: 20 }} elevation={2}>
						<form onSubmit={handleSubmit}>
							<div>
								<Typography variant="h6">Title</Typography>
								<Typography variant="subtitle2">
									Be specific and imagine you're asking a
									question to a real person
								</Typography>
							</div>
							<TextField
								onChange={handleChange}
								name="title"
								value={data.title}
								placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
								variant="filled"
								required
							/>

							<div>
								<Typography variant="h6">Body</Typography>
								<Typography variant="subtitle2">
									Include all informations someone would need
									to answer your question
								</Typography>
							</div>
							<TextField
								onChange={handleChange}
								name="content"
								value={data.content}
								placeholder="Type something here..."
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
								variant="filled"
								multiline
								rows={10}
								required
							/>

							<div>
								<Typography variant="h6">Tags</Typography>
								<Typography variant="subtitle2">
									Add up to 5 tags to describe what your
									question is about
								</Typography>
							</div>
							<TextField
								onChange={handleChange}
								name="tags"
								value={data.tags}
								placeholder="e.g. (reactjs iphone ruby-on-rails)"
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
								variant="filled"
								required
							/>

							{data.error ? <p>{data.writeError}</p> : null}

							<Button
								color="primary"
								variant="contained"
								size="large"
								type="submit"
								style={{ marginTop: 10 }}>
								Post your question
							</Button>
						</form>
					</Paper>
				</Grid>
				<Grid item sm={3}>
					<AddQuestionSidebar />
				</Grid>
			</Grid>
		</Container>
	);
}

const useStyles = makeStyles((theme) => ({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '2rem 0',
	},
}));
