import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ControlledAccordions() {
	const classes = useStyles();
	const [expanded, setExpanded] = useState('panel1');

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div className={classes.root}>
			<Accordion
				expanded={expanded === 'panel1'}
				onChange={handleChange('panel1')}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header">
					<Typography className={classes.heading}>Step 1:</Typography>
					<Typography className={classes.secondaryHeading}>
						Draft your question
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography variant="body2">
						The community is here to help you with specific coding,
						algorithm, or language problems. Avoid asking
						opinion-based questions.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={expanded === 'panel2'}
				onChange={handleChange('panel2')}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2bh-content"
					id="panel2bh-header">
					<Typography className={classes.heading}>Step 2:</Typography>
					<Typography className={classes.secondaryHeading}>
						Describe what you’ve tried
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography variant="body2">
						Show what you’ve tried and tell us what you found (on
						this site or elsewhere) and why it didn’t meet your
						needs. You can get better answers when you provide
						research.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={expanded === 'panel3'}
				onChange={handleChange('panel3')}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3bh-content"
					id="panel3bh-header">
					<Typography className={classes.heading}>Step 3:</Typography>
					<Typography className={classes.secondaryHeading}>
						Show some code
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography variant="body2">
						When appropriate, share the minimum amount of code
						others need to reproduce your problem (also called a
						minimum, reproducible example)
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={expanded === 'panel4'}
				onChange={handleChange('panel4')}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel4bh-content"
					id="panel4bh-header">
					<Typography>Have a non-programming question?</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography variant="caption">
						Troubleshooting hardware and software issues <br />
						Software engineering <br /> For software development
						methods and process questions <br /> Hardware
						recommendations <br /> Software recommendations <br />{' '}
						Ask questions about the site on meta
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginLeft: 10,
		[theme.breakpoints.down('md')]: {
			marginTop: 10,
			marginLeft: 0,
		},
	},
	heading: {
		fontSize: theme.typography.pxToRem(13),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(13),
		color: theme.palette.text.secondary,
	},
}));
