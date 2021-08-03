import React from 'react'
import PropTypes from 'prop-types'
import { validatedButton } from '../utils'

import Parts from './Parts'
import ButtonHandler from './ButtonHandler'
import ProgressBar from './ProgressBar'

// Material UI
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import useStyles from '../styles'

const Survey = ({
	handleFormSubmit,
	questionSets,
	currentPage,
	handleNextPage,
	handlePreviousPage,
	formData
}) => {
	const classes = useStyles()

	// Button handlers
	const handlePreviousButton = () => {
		// Remove 'Edellinen' button when viewing first page
		if (currentPage === 1) {
			return null
		} else {
			return (
				<ButtonHandler
					text='Edellinen'
					colors={{ bg: '#cddc39', bgHover: '#c0ca33' }}
					handlePagination={() => handlePreviousPage()}
				/>
			)
		}
	}

	const handleNextButton = () => {
		// Last button to submit the survey with different styling
		if (questionSets.length === currentPage) {
			return (
				<ButtonHandler
					text='Olen valmis'
					colors={{ bg: '#ffeb3b', bgHover: '#fbc02d' }}
					handlePagination={(event) => handleFormSubmit(event)}
					questionSets={questionSets}
				/>
			)
		}
		return (
			<ButtonHandler
				text='Seuraava'
				colors={{ bg: '#cddc39', bgHover: '#c0ca33' }}
				handlePagination={() => handleNextPage()}
				questionSets={questionSets}
			/>
		)
	}

	return (
		<>
			<Container className={classes.survey} maxWidth='md'>
				<Box align='center'>
					<Typography variant='h4' component='h1' gutterBottom>
						Yrittäjän ajanhallinnankysely
					</Typography>
				</Box>
				<Box pt={2} pb={4} px={3} className={classes.form}>
					{/* Survey form */}
					<form onSubmit={handleFormSubmit}>
						<Parts
							questionSets={questionSets}
							currentPage={currentPage}
							formData={formData}
						/>
					</form>
				</Box>
				{/* Helper text if button is disabled */}
				<Box textAlign='right'>
					{validatedButton() ? (
						<Typography variant='caption'>
							Jokaiseen kysymykseen tulee vastata
						</Typography>
					) : (
						<Box mt={2.5}></Box>
					)}
				</Box>
				{/* Previous and Next buttons */}
				<Grid container direction='row' justify='space-between'>
					<Grid item>
						<Box>{handlePreviousButton()}</Box>
					</Grid>
					<Grid item>{handleNextButton()}</Grid>
				</Grid>

				<Box m='auto'>
					<ProgressBar />
				</Box>
			</Container>
		</>
	)
}

Survey.propTypes = {
	handleFormSubmit: PropTypes.func,
	handleNextPage: PropTypes.func,
	handlePreviousPage: PropTypes.func,
	questionSets: PropTypes.array,
	currentPage: PropTypes.number,
	formData: PropTypes.array
}

export default Survey
