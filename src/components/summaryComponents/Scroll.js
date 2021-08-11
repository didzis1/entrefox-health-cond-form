import React from 'react'
import PropTypes from 'prop-types'

// Material UI
import useStyles from '../../styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Images
import entrefox_badge from '../../images/summary/entrefox_badge.png'

const Scroll = ({ answer }) => {
	const classes = useStyles()

	return (
		<Grid
			container
			className={classes.goalBox}
			justify='center'
			direction='column'>
			<Grid container direction='row' item alignItems='center'>
				<Grid item xs={12} md={5}>
					<Box className={classes.badge}>
						<img src={entrefox_badge} />
					</Box>
				</Grid>
				<Grid item>
					<Box mx={2} my={1}>
						<Typography variant='body1'>{answer}</Typography>
					</Box>
				</Grid>
			</Grid>
		</Grid>
	)
}

Scroll.propTypes = {
	answer: PropTypes.string
}

export default Scroll
