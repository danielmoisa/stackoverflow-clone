import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { auth, db } from '../services/firebase';
import firebase from 'firebase';

export default function Question({ commId }) {
	const classes = useStyles();

	const [data, setData] = useState({
		user: auth().currentUser,
		comment: '',
		comments: [],
		readError: null,
		writeError: null,
		showBtn: false,
	});

	async function fetchData() {
		try {
			await db
				.collection(`questions/${commId}/comments`)
				.orderBy('timestamp', 'asc')
				.get()
				.then((onSnapshot) => {
					const comments = [];

					onSnapshot.forEach(function (doc) {
						comments.push({
							content: doc.data().comment,
							username: doc.data().username,
							timestamp: doc.data().timestamp,
							uid: doc.data().uid,
							id: doc.id,
						});
					});

					setData({ ...data, comments: comments });
				});
		} catch (error) {
			console.log('Error getting documents: ', error);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	async function handleSubmitComments(event) {
		event.preventDefault();
		setData({ ...data, writeError: null });
		try {
			await db
				.collection('questions')
				.doc(commId)
				.collection('comments')
				.add({
					comment: data.comment,
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
					uid: data.user.uid,
					username: data.user.email.substring(
						0,
						data.user.email.lastIndexOf('@')
					),
				});
			setData({ ...data, comment: '' });
			fetchData();
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
		<div>
			<div>
				{data.comments.map((comment) => (
					<div className={classes.comment} key={comment.id}>
						<Typography variant="caption">
							{comment.content} - {comment.username}
						</Typography>
					</div>
				))}
			</div>
			<form onSubmit={handleSubmitComments}>
				<TextField
					onChange={handleChange}
					name="comment"
					value={data.content}
					placeholder="Add an comment to Stack Overflow!"
					fullWidth
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
					variant="filled"
					required
					size="small"
				/>

				<Button
					color="primary"
					variant="contained"
					size="small"
					type="submit"
					style={{
						marginTop: 5,
					}}>
					Add comment
				</Button>
			</form>
		</div>
	);
}
const useStyles = makeStyles((theme) => ({
	comment: {
		borderBottom: '1px solid rgba(204, 204, 204, 0.5)',
		padding: 5,
		transition: '0.3s all',
		'&:last-child': {
			borderBottom: 'none',
		},
	},
}));
