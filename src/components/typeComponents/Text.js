import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../../contexts/FormContext'
import { getAnswerByID } from '../../utils'

// Material UI
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

// eslint-disable-next-line no-unused-vars
const Text = ({ question }) => {
	const { handleInputChange } = useForm()

	return (
		<Box key={question.ID} my={2}>
			<TextField
				name={question.ID && question.ID.toString()}
				value={getAnswerByID(question.page, question.ID)}
				onChange={(event) =>
					handleInputChange(event.target.name, event.target.value)
				}
				rows='4'
				variant='outlined'
				fullWidth
				label={question.text && question.text}
				InputProps={{
					multiline: true,
					rows: 2
				}}
				InputLabelProps={{
					style: {
						fontSize: '1.1rem'
					}
				}}
			/>
		</Box>
	)
}

Text.propTypes = {
	question: PropTypes.object
}

export default Text
