import React from 'react'
import questionSets from './data/questions.json'
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
	let answeredQuestions = 0
	let questionAmount = questionSets.find((page) => page.id === currentPage)
		?.questions.length

	if (currentPage === 4) {
		// questionAmount is the amount that is generated depending on question 11 answer
		questionAmount = pageFourOutcomes(formData).length
	}

	// Loop over each answer in the page and count the answered questions
	formData
		?.find((answersPage) => answersPage.page === currentPage)
		?.answers.forEach((answer) => {
			if (answer.type === 'checkbox') {
				const isCheckedAmount = answer.value.filter(
					(checkbox) => checkbox.isChecked
				).length
				isCheckedAmount === 0 ? null : answeredQuestions++
			} else {
				if (answer.value) {
					return answeredQuestions++
				}
			}
		})

	// If answers are equal to or bigger than questions take off disabled button
	return !(questionAmount <= answeredQuestions)
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

export const pageFourOutcomes = (formData) => {
	let questionsToRender = []
	// Get all checked answers for the question 11
	const answers = getAnswerByID(3, 11, formData).value.filter(
		(answer) => answer.isChecked
	)

	// Push all the id's of the questions that need to be rendered to questionsToRender array
	answers.map((answer) => {
		let arrayOfIds = []
		if (answer.id === 1) {
			arrayOfIds = [12, 13]
		} else if (answer.id === 2) {
			arrayOfIds = [14, 15]
		} else if (answer.id === 3) {
			arrayOfIds = [16, 17]
		} else if (answer.id === 4) {
			arrayOfIds = [18, 19]
		} else if (answer.id === 5) {
			arrayOfIds = [20, 21]
		}
		arrayOfIds.forEach((id) => questionsToRender.push(id))
	})

	return questionsToRender
}
