import React, { useEffect } from 'react'
import questionSets from './data/questions.json'
import { useForm } from './contexts/FormContext'
import { scrollToTop } from './utils'

// Components
import Survey from './components/Survey'
import Footer from './components/Footer'

// Material UI
import Box from '@material-ui/core/Box'
import useStyles from './styles'

const App = () => {
	const {
		currentPage,
		setCurrentPage,
		formSubmitted,
		setFormSubmitted,
		formData
	} = useForm()
	const classes = useStyles()

	// Scroll to top when page is changed
	useEffect(() => {
		scrollToTop(true)
	}, [currentPage])

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1)
	}

	const handlePreviousPage = () => {
		setCurrentPage(currentPage - 1)
	}

	const handleFormSubmit = (event) => {
		event.preventDefault()
		setFormSubmitted(!formSubmitted)
		scrollToTop(true)
	}

	return (
		<Box className={classes.mainBackground}>
			<Box pt={5}>
				{formSubmitted ? (
					'Summary displayed...'
				) : (
					<Survey
						handleFormSubmit={handleFormSubmit}
						handleNextPage={handleNextPage}
						handlePreviousPage={handlePreviousPage}
						questionSets={questionSets}
						currentPage={currentPage}
						formSubmitted={formSubmitted}
						formData={formData}
					/>
				)}

				<Footer />
			</Box>
		</Box>
	)
}

export default App
