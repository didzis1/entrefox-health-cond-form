import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../../contexts/FormContext'
import { getAnswerByID } from '../../utils'

// Material UI
import DateFnsUtils from '@date-io/date-fns'
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const DateField = ({ question }) => {
	const [checked, setChecked] = useState(false)
	const { handleInputChange, currentPage, formData } = useForm()
	const answer = getAnswerByID(currentPage, question.id, formData)
	if (!answer) {
		return null
	}
	const handleSetDate = (event) => {
		const dateToString = event.toString()
		if (dateToString === 'Invalid Date') {
			return handleInputChange(question.id, '')
		}
		handleInputChange(question.id, dateToString)
	}

	const resetDate = () => {
		setChecked(!checked)
		handleInputChange(question.id, checked ? null : true)
	}

	return (
		<Box my={2}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					autoOk
					variant='inline'
					inputVariant='outlined'
					label='Syötä päivämäärä'
					invalidDateMessage='Väärä päivämäärä'
					format='dd/MM/yyyy'
					value={answer.value}
					disabled={checked}
					InputAdornmentProps={{ position: 'start' }}
					onChange={(event) => handleSetDate(event)}
				/>
			</MuiPickersUtilsProvider>
			<Box mt={2}>
				<FormControlLabel
					control={
						<Checkbox
							checked={checked}
							name='Datefield disabler'
							onChange={() => resetDate()}
							inputProps={{
								'aria-label': 'En halua asettaa päivämäärää'
							}}
							color='primary'
						/>
					}
					label='En halua asettaa päivämäärää'
				/>
			</Box>
		</Box>
	)
}

DateField.propTypes = {
	question: PropTypes.object
}

export default DateField
