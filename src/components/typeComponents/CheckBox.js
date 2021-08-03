import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../../contexts/FormContext'
import { getAnswerByID } from '../../utils'

// Material UI
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'

const CheckBox = ({ question }) => {
	const { currentPage, handleInputChange, formData } = useForm()
	const currentValues = getAnswerByID(currentPage, question.id, formData)

	const handleCheckBox = (event, id) => {
		const checkedBox = {
			id,
			text: event.target.name,
			isChecked: event.target.checked
		}

		handleInputChange(question.id, checkedBox)
	}

	return (
		<Box mt={2}>
			<FormGroup>
				{question.choices.map((choice) => (
					<FormControlLabel
						key={choice.id}
						control={
							<Checkbox
								onChange={(event) =>
									handleCheckBox(event, choice.id)
								}
								checked={
									currentValues?.value.find(
										(answer) => answer.id === choice.id
									).isChecked || false
								}
								name={choice.text}
								inputProps={{ 'aria-label': choice.text }}
								color='primary'
							/>
						}
						label={choice.text}
					/>
				))}
			</FormGroup>
		</Box>
	)
}

CheckBox.propTypes = {
	question: PropTypes.object
}

export default CheckBox
