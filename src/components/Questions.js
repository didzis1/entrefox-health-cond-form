import React from 'react'
import PropTypes from 'prop-types'
import { typeComponent } from '../utils'

// Material UI
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const Question = ({ questions }) => {
	return (
		<>
			{questions.map((question) => {
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
