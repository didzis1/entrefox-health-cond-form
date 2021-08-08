import React from 'react'
import PropTypes from 'prop-types'
import { typeComponent, getAnswerByID } from '../utils'
import { useForm } from '../contexts/FormContext'

// Material UI
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const Question = ({ questions }) => {
	const { formData, currentPage } = useForm()
	// Assign questions to a variable allQuestions
	// allQuestions is rendered and ONLY modified if the user is on page 4
	let allQuestions = questions
	// eslint-disable-next-line no-unused-vars
	const pageFourOutcomes = (answer) => {
		switch (answer.id) {
			case 1:
				return [13, 14]
			case 2:
				return [15, 16]
			case 3:
				return [17, 18]
			case 4:
				return [19, 20]
			case 5:
				return [21, 22]
			default:
				return []
		}
	}

	if (currentPage === 4) {
		let questionsToRender = []
		// Get all checked answers for the question 11
		const answers = getAnswerByID(3, 11, formData).value.filter(
			(answer) => answer.isChecked
		)
		// Push all the id's of the questions that need to be rendered to questionsToRender array
		answers.map((answer) => {
			const arrayOfIds = pageFourOutcomes(answer)
			arrayOfIds.forEach((id) => questionsToRender.push(id))
		})

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
