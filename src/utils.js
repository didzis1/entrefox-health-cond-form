import React from 'react'

import RadioButton from './components/typeComponents/RadioButton'
import Text from './components/typeComponents/Text'
import CheckBox from './components/typeComponents/CheckBox'

export const getAnswerByID = (questionPage, questionID, formData) => {
	// Find the page the answer is located at, then find the answer's value based on questionID
	return formData
		?.find((answer) => answer.page === questionPage)
		.answers.find((answer) => answer.id === questionID)
}

// If validatedButton returns true, 'Seuraava' or 'Olen valmis' button is disabled
// eslint-disable-next-line no-unused-vars
export const validatedButton = (currentPage, formData) => {
	return false
}

export const typeComponent = (question) => {
	// Each question returns it's corresponding component
	// Type is assigned in questions.json for each question
	switch (question.type) {
		case 'radio':
			return <RadioButton question={question} />
		case 'text':
			return <Text question={question} />
		case 'checkbox':
			return <CheckBox question={question} />
		default:
			throw new Error('Type not found...')
	}
}

// Convert date to dd.MM.YYYY format
export const dateToYMD = (date) => {
	return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}

export const scrollToTop = (isSmooth) => {
	return window.scrollTo({
		top: 0,
		left: 0,
		behavior: isSmooth ? 'smooth' : 'auto'
	})
}
