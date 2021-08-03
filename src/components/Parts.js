import React from 'react'
import PropTypes from 'prop-types'

import Questions from './Questions'

// Material UI
import Box from '@material-ui/core/Box'

const Parts = ({ questionSets, currentPage }) => {
	const questionsPerPage = questionSets.map((questionSet) =>
		console.log(questionSet)
	)

	console.log(questionsPerPage)

	// Render questions from questionsInPage with fetchedQuestions question ID's
	return (
		<Box>
			{questionSets.map((part) => (
				<Box
					key={part.id}
					id={part.id}
					style={{
						display: currentPage === part.id ? '' : 'none'
					}}>
					<Questions questions={part.questions} />
				</Box>
			))}
		</Box>
	)
}

Parts.propTypes = {
	questionSets: PropTypes.array,
	currentPage: PropTypes.number
}

export default Parts
