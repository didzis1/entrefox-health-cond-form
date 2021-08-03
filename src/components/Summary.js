import React from 'react'
import PropTypes from 'prop-types'
import { dateToYMD, scrollToTop } from '../utils'

// Summary components
import SummaryContent from './summaryComponents/SummaryContent'
import ButtonHandler from './ButtonHandler'

// Material UI
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import useStyles from '../styles'
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded'
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'

// Images
import header from '../images/summary/header.png'
import entrefox_pdf_bg from '../images/background/pdf_background.png'

import html2pdf from 'html2pdf.js'

const Summary = ({ handleFormSubmit }) => {
	const classes = useStyles()

	//const firstPart = content.find((part) => part.question === 2 && part.condition)
	// Get todays date
	const currentDate = dateToYMD(new Date())

	const downloadPDF = async () => {
		// scrolling up is necessary in order for the PDF to load correctly
		await scrollToTop(false)

		// Select and clone elements that are to be edited for the PDF
		let pieCharts = document.querySelectorAll('#pie-chart')
		const pieContainer = document.querySelectorAll('#pie-container')
		const pdfPages = document.querySelectorAll('.pdf_page')

		// Create an empty array for images
		let pieImages = []

		// For each rendered pieChart, create a new image element and push it to pieImages array
		pieCharts.forEach(() => {
			pieImages.push(new Image())
		})

		// For each image, add various of styles, an id and an src for the image taken from the canvas pie chart
		pieImages.forEach((pieImage, index) => {
			pieImage.id = 'pie-rendered-image'
			pieImage.src = pieCharts[index].toDataURL()
			pieImage.style.width = '300px'
			pieImage.style.height = '300px'
			pieImage.style.display = 'block'
			pieImage.style.margin = 'auto'
		})

		// Add one image per one container (container that holds the PieChart canvas)
		pieContainer.forEach((container, index) => {
			container.appendChild(pieImages[index])
		})

		// Temporarily set PieChart to invisible so that it doesn't take empty space in the PDF
		// This has to be done since html2pdf does not recognize canvas elements, although renders them as taken up space
		pieCharts.forEach((pieChart) => {
			pieChart.style.display = 'none'
		})

		pdfPages.forEach((pdfPage) => {
			pdfPage.style.paddingTop = '35px'
		})

		const element = document.getElementById('summary').cloneNode(true)
		const singlePage = document.querySelectorAll('.pdf_page')
		const lastPage = document
			.getElementById('last-pdf-page')
			.cloneNode(true)
		// Style settings for cloned elements
		// PDF page size: [215.9mm x 279.4mm]
		lastPage.style.height = '972px'
		element.style.backgroundImage = `url(${entrefox_pdf_bg})`
		element.style.backgroundSize = '100% 279.4mm'
		element.style.backgroundRepeat = 'repeat-y'
		element.style.padding = '15px 100px 0px 100px'
		singlePage.forEach((page) => (page.style.margin = '25px auto'))

		// Options for the html2pdf rendering
		const opt = {
			filename: 'entrefox_summary.pdf',
			image: { type: 'jpeg' },
			html2canvas: {
				scale: 2,
				scrollX: -window.scrollX,
				scrollY: -window.scrollY,
				windowWidth: document.documentElement.offsetWidth,
				windowHeight: document.documentElement.offsetHeight
			},
			jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
			pagebreak: { mode: ['avoid-all', 'css', 'legacy', 'whiteline'] }
		}

		// Generate the PDF from the defined options
		window.open(await html2pdf().from(element).set(opt).output('bloburl'))

		// Change the styling back to the original after the PDF is finished rendering
		lastPage.style.height = 'auto'
		element.style.padding = ''
		element.style.backgroundImage = ''
		element.style.backgroundSize = ''
		singlePage.forEach((page) => (page.style.margin = 'auto'))

		// Set PieChart back to visible
		pieCharts.forEach((pieChart) => {
			pieChart.style.display = ''
		})

		// Remove previously created images from the HTML
		pieImages.forEach((pieImage) => {
			pieImage.parentNode.removeChild(pieImage)
		})

		pdfPages.forEach((pdfPage) => {
			pdfPage.style.paddingTop = '0px'
		})
	}

	return (
		<Container className={classes.survey} maxWidth='md'>
			<ButtonHandler
				text='Palaa takaisin'
				colors={{ bg: '#cddc39', bgHover: '#c0ca33' }}
				handlePagination={handleFormSubmit}
			/>

			{/* PDF starts here */}
			<Box id='summary'>
				<Box my={5}>
					<Typography
						component='h1'
						variant='h3'
						color='primary'
						align='center'>
						Yrittäjän
					</Typography>
					<Typography
						variant='h4'
						component='h1'
						align='center'
						gutterBottom>
						ajanhallinnan koonti
					</Typography>
					<Box mt={2} align='center'>
						<img src={header} className={classes.headingImage} />
					</Box>
					<Typography variant='h6' align='center'>
						Olet käynyt kehityskeskustelun {currentDate}.
					</Typography>
				</Box>
				<Divider data-html2canvas-ignore='true' />

				{/* Manual page-break for the PDF generation */}
				<Box className='html2pdf__page-break'></Box>

				<Box mt={4}>
					<SummaryContent />
				</Box>
			</Box>
			{/* PDF ends here */}

			<Box mt={2}>
				<Grid container direction='row' justify='space-between'>
					<Grid item>
						<Box my={1}>
							<ButtonHandler
								text='Lataa PDF'
								colors={{ bg: '#cddc39', bgHover: '#c0ca33' }}
								startIcon={<GetAppRoundedIcon />}
								handlePagination={downloadPDF}
							/>
						</Box>
					</Grid>
					<Grid item>
						<Box my={1}>
							<ButtonHandler
								href='https://www.entrefox.fi/ajanhallinta/'
								text='Päätä kysely'
								startIcon={<CheckCircleOutlineRoundedIcon />}
								colors={{
									bg: '#ffeb3b',
									bgHover: '#fbc02d'
								}}
							/>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Container>
	)
}

Summary.propTypes = {
	handleFormSubmit: PropTypes.func
}

export default Summary
