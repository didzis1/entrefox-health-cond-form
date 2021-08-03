import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from '../contexts/FormContext'
import { validatedButton } from '../utils'

// Material UI
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'

const ButtonHandler = ({ text, handlePagination, colors, startIcon, href }) => {
	const { currentPage, formData } = useForm()
	const ColorButton = withStyles(() => ({
		root: {
			backgroundColor: colors.bg,
			color: '#000000',
			letterSpacing: '2px',
			'&:hover': {
				color: '#FFFFFF',
				backgroundColor: colors.bgHover
			}
		}
	}))(Button)

	// If the button has a redirect link as props render it with own styles
	if (href) {
		return (
			<ColorButton
				href={href}
				type='button'
				variant='contained'
				startIcon={startIcon}>
				{text}
			</ColorButton>
		)
	}

	return (
		<>
			<ColorButton
				onClick={handlePagination}
				type='button'
				variant='contained'
				startIcon={startIcon}
				disabled={
					text === 'Edellinen'
						? false
						: validatedButton(currentPage, formData)
				}>
				{text}
			</ColorButton>
		</>
	)
}

ButtonHandler.propTypes = {
	text: PropTypes.string,
	handlePagination: PropTypes.func,
	questionSets: PropTypes.array,
	colors: PropTypes.object,
	startIcon: PropTypes.object,
	href: PropTypes.string
}

export default ButtonHandler
