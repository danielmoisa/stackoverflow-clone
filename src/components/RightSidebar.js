import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import logo from '../assets/logo.png';

export default function Sidebar() {
	const classes = useStyles();

	return (
		<div className={classes.sidebar}>
			<Paper className={classes.wrapper} elevation={1}>
				<Typography
					className={classes.title}
					style={{
						padding: 10,
					}}
					variant="subtitle1">
					The Overflow Blog
				</Typography>
				<div style={{ padding: 10 }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							padding: '10px 0',
						}}>
						<EditIcon style={{ fontSize: 18 }} />
						<Typography
							variant="caption"
							style={{
								marginLeft: 5,
							}}>
							The Overflow #31: Fresh data
						</Typography>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							padding: '10px 0',
						}}>
						<EditIcon style={{ fontSize: 18 }} />
						<Typography
							variant="caption"
							style={{
								marginLeft: 5,
							}}>
							The perils of impersonation tooling
						</Typography>
					</div>
				</div>

				<Typography
					className={classes.title}
					style={{
						padding: 10,
					}}
					variant="subtitle1">
					Featured on Meta
				</Typography>
				<div style={{ padding: 10 }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							padding: '10px 0',
						}}>
						<ChatBubbleOutlineIcon
							color="primary"
							style={{ fontSize: 18, alignSelf: 'flex-start' }}
						/>
						<Typography
							variant="caption"
							style={{
								marginLeft: 5,
							}}>
							The new moderator agreement is now live for
							moderators to accept across the…
						</Typography>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							padding: '10px 0',
						}}>
						<ChatBubbleOutlineIcon
							color="primary"
							style={{ fontSize: 18, alignSelf: 'flex-start' }}
						/>
						<Typography
							variant="caption"
							style={{
								marginLeft: 5,
							}}>
							Improved experience for users with review
							suspensions
						</Typography>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							padding: '10px 0',
						}}>
						<img
							style={{
								width: 20,
								height: 20,
							}}
							src={logo}
							alt="StackOverflow"
						/>
						<Typography
							variant="caption"
							style={{
								marginLeft: 5,
							}}>
							2020 Community Moderator Election Results
						</Typography>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							padding: '10px 0',
						}}>
						<img
							style={{
								width: 20,
								height: 20,
							}}
							src={logo}
							alt="StackOverflow"
						/>
						<Typography
							variant="caption"
							style={{
								marginLeft: 5,
							}}>
							Unnecessary secondary accounts and avoiding
							moderator action
						</Typography>
					</div>
				</div>
			</Paper>

			<div>
				<Typography
					variant="h6"
					style={{ marginTop: 20, marginBlock: 10 }}>
					Top Tags
				</Typography>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'flex-start',
					}}>
					<Typography className={classes.tag} variant="caption">
						Java
					</Typography>
					<Typography className={classes.tag} variant="caption">
						Python
					</Typography>
					<Typography className={classes.tag} variant="caption">
						JavaScript
					</Typography>
					<Typography className={classes.tag} variant="caption">
						c#
					</Typography>
					<Typography className={classes.tag} variant="caption">
						android
					</Typography>
					<Typography className={classes.tag} variant="caption">
						php
					</Typography>
					<Typography className={classes.tag} variant="caption">
						css
					</Typography>
					<Typography className={classes.tag} variant="caption">
						ios
					</Typography>
				</div>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	sidebar: {
		paddingTop: 5,
		paddingLeft: 5,
		marginLeft: 5,
		marginTop: '-3px',
	},
	tag: {
		margin: 5,
		padding: '5px 7px',
		backgroundColor: '#e1ecf4',
		borderRadius: 2,
		color: '#0064bd',
	},
	title: {
		backgroundColor: theme.palette.yellow.dark,
	},
	wrapper: {
		backgroundColor: theme.palette.yellow.main,
	},
}));
