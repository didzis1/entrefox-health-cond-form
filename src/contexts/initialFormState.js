import questions from '../data/questions.json'

// Initiate the state with empty values for every question in the questions.json file
const initialFormState = questions.map((page) => {
	return {
		page: page.id,
		answers: page.questions.map((question) => {
			switch (question.type) {
				case 'radio':
					return {
						id: question.id,
						type: question.type,
						value: null
					}
				case 'checkbox':
					return {
						id: question.id,
						type: question.type,
						value: question.choices.map((choice) => ({
							text: choice.text,
							isChecked: false,
							id: choice.id
						}))
					}
				case 'text':
					return {
						id: question.id,
						type: question.type,
						value: ''
					}
				default:
					return {
						id: question.id,
						type: question.type,
						value: ''
					}
			}
		})
	}
})

export default initialFormState
