import React, { useState, useContext, createContext } from 'react'
import PropTypes from 'prop-types'
import initialFormState from './initialFormState'

const FormContext = createContext(null)

export const useForm = () => {
	const context = useContext(FormContext)

	if (!context) {
		throw new Error('useForm() is used outside of FormContext')
	}

	return context
}

// Update FormContext provider
const FormContextProvider = ({ children }) => {
	const [formData, setFormData] = useState(initialFormState) // Form is controlled and data is saved in state
	const [currentPage, setCurrentPage] = useState(1) // Keeping track on visible page
	const [formSubmitted, setFormSubmitted] = useState(false) // Value changes on form submit or 'Palaa takaisin' button
	const handleSubmitChange = (event) => {
		event.preventDefault()
		setFormSubmitted(!formSubmitted)
	}
	// Update formData state
	const handleInputChange = (id, value) => {
		const newData = {
			id: parseInt(id),
			value
		}
		// Create a new state variable
		const newState = formData.map((pageToEdit) => {
			// Change the value in the page it is located at
			if (pageToEdit.page === currentPage) {
				return {
					...pageToEdit, // id of the page
					answers: pageToEdit.answers.map((answer) =>
						answer.id === newData.id
							? { ...answer, id: parseInt(id), value }
							: answer
					)
				}
			}
			// Return page data (no values need to be changed here)
			return {
				...pageToEdit
			}
		})
		// Replace the old state with new one
		setFormData(newState)
	}

	// Return all necessary variables and functions for children components to use
	const value = {
		formSubmitted,
		formData,
		currentPage,
		handleSubmitChange,
		handleInputChange,
		setCurrentPage,
		setFormSubmitted
	}

	return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

FormContextProvider.propTypes = {
	children: PropTypes.object
}

export default FormContextProvider
