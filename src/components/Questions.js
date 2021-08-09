import React from 'react'
import PropTypes from 'prop-types'
import { typeComponent, pageFourOutcomes } from '../utils'
import { useForm } from '../contexts/FormContext'

// Material UI
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const Question = ({ questions }) => {
	const { formData, currentPage } = useForm()
	// Assign questions to a variable allQuestions
	// allQuestions is rendered and ONLY modified if the user is on page 4
	let allQuestions = questions

	if (currentPage === 4) {
		const questionsToRender = pageFourOutcomes(formData)
		// Modify allQuestions array, display only questions based on question 11 answer
		allQuestions = allQuestions.filter((question) =>
			questionsToRender.includes(question.id)
		)
	}

	return (
		<>
			{allQuestions.map((question) => {
				return (
					<Box key={question.id} mt={3}>
						<Typography variant='h5'>{question.title}</Typography>
						{question.description && (
							<Box fontStyle='italic' mt={2}>
								<Typography variant='body1'>
									{question.description}
								</Typography>
							</Box>
						)}
						{/* Component is determined based on it's type in typeComponent */}
						{typeComponent(question)}
					</Box>
				)
			})}
		</>
	)
}

Question.propTypes = {
	questions: PropTypes.array
}

export default Question
