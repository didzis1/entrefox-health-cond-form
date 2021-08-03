import React from 'react'

// Material UI
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import useStyles from '../styles'

// Footer logos
import turkuamk_logo from '../images/footer/turkuamk_logo.png'
import hy_logo from '../images/footer/hy_logo.png'
import tyoterveyslaitos_logo from '../images/footer/tyoterveyslaitos_logo.png'
import esr_logo from '../images/footer/esr_logo.png'
import vipuvoimaa_logo from '../images/footer/vipuvoimaa_logo.png'
import entrefox_logo from '../images/footer/entrefox_logo.png'

const Footer = () => {
	const classes = useStyles()
	return (
		<Box mt={4}>
			<Grid container direction='column' className={classes.mainGrid}>
				<Grid
					container
					item
					direction='row'
					justify='space-evenly'
					alignItems='center'>
					<Grid item xs={8} sm={5} md={4}>
						<Box my={2} px={2}>
							<img
								src={turkuamk_logo}
								className={classes.gridList}
							/>
						</Box>
					</Grid>
					<Grid item xs={9} sm={5} md={4}>
						<Box my={2} px={2}>
							<img src={hy_logo} className={classes.gridList} />
						</Box>
					</Grid>
					<Grid item xs={8} sm={5} md={4}>
						<Box my={2} px={2}>
							<img
								src={tyoterveyslaitos_logo}
								className={classes.gridList}
							/>
						</Box>
					</Grid>
				</Grid>
				<Grid
					container
					item
					direction='row'
					justify='space-evenly'
					alignItems='center'>
					<Grid item xs={6} sm={4} md={3}>
						<Box>
							<img src={esr_logo} className={classes.gridList} />
						</Box>
					</Grid>
					<Grid item xs={8} sm={4} md={3}>
						<Box>
							<img
								src={vipuvoimaa_logo}
								className={classes.gridList}
							/>
						</Box>
					</Grid>
				</Grid>
				<Grid
					container
					item
					direction='column'
					alignItems='center'
					justify='center'>
					<Grid item xs={8} sm={6}>
						<Box my={2}>
							<img
								src={entrefox_logo}
								className={classes.gridList}
							/>
						</Box>
					</Grid>
					<Grid item>
						<Box my={3}>
							<Typography variant='subtitle2'>
								Toteutettu EntreFox hankkeessa 2021
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Footer
