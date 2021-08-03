import React from 'react'
import PropTypes from 'prop-types'

import Questions from './Questions'

// Material UI
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const Parts = ({ questionSets, currentPage }) => {
	// Render questions from questionsInPage with fetchedQuestions question ID's
	return (
		<Box>
			{questionSets.map((part) => {
				if (part.id === currentPage) {
					return (
						<Box
							key={part.id}
							id={part.id}
							style={{
								display: currentPage === part.id ? '' : 'none'
							}}>
							<Typography variant='h5' color='primary'>
								{part.heading}
							</Typography>
							{part.subHeading && (
								<Box fontStyle='italic' mt={1}>
									<Typography variant='body1'>
										{part.subHeading}
									</Typography>
								</Box>
							)}
							<Questions questions={part.questions} />
						</Box>
					)
				}
				return null
			})}
		</Box>
	)
}

Parts.propTypes = {
	questionSets: PropTypes.array,
	currentPage: PropTypes.number
}

export default Parts
