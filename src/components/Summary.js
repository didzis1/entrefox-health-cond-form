import React from 'react'
import PropTypes from 'prop-types'
import { dateToYMD, scrollToTop } from '../utils'

// Summary components
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
		const pdfPages = document.querySelectorAll('.pdf_page')

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
					<Box mt={2}>
						<Typography variant='body1'>
							Olet arvioinut nykytilaasi liikkumisesta sekä
							tulevaisuuden suunnittelmiasi{' '}
							<Box fontWeight={500} component='span'>
								{currentDate}
							</Box>
							. Yhteenvedosta voit tarkastella liikkumisen
							nykytilaasi, UKK:n suosituksia sekä tulevaisuuden
							tavoitetilaasi. Lisäksi olemme koonneet vinkkejä ja
							linkkejä terveyskuntosi ylläpitämiseksi.
						</Typography>
					</Box>
				</Box>
				<Divider data-html2canvas-ignore='true' />

				{/* Manual page-break for the PDF generation */}
				<Box className='html2pdf__page-break'></Box>

				{/* Content starts here */}
				<Box mt={4}>
					<Box className='pdf_page' my={2}>
						<Box>
							<Typography color='primary' variant='h5'>
								Lihaskunto ja liikkeenhallinta
							</Typography>
						</Box>
						<Box>
							<Typography>
								Lihaskuntoa ja liikkeenhallintaa olet kertonut
								harrastavasi [kohta 1] krt/vko. UKK:n
								suositusten mukaan lihaskuntoa ja
								liikkeenhallintaa kannattaa tehdä 2 kertaa
								viikossa hyvän terveyskunnon ylläpitämiseksi.
							</Typography>
						</Box>
						<Box>
							-------------------------- GRAPH HERE
							--------------------------
						</Box>
						<Box>
							<Typography>
								Lihaskuntoa ja liikkeenhallintaa ylläpidät tällä
								hetkellä: [kohta 6]
							</Typography>
						</Box>

						<Box style={{ backgroundColor: '#FFCCCB' }}>
							<Typography variant='h3'>
								OPTIONAL_ANSWERS_BELOW
							</Typography>
							<Typography>
								Olet valinnut teeman myös kehitettäväksi
								osa-alueeksi liikkumisessasi. Tulevaisuudessa
								tavoitteenasi on liikkua: [kohta 12 lihaskunto]
								krt/vko ja tavoitteen saavutat: [kohta 12
								avokenttä lihaskunto]
							</Typography>
						</Box>
					</Box>

					<Box className='pdf_page' my={2}>
						<Box>
							<Typography color='primary' variant='h5'>
								Rasittava liikkuminen
							</Typography>
						</Box>
						<Box>
							<Typography>
								Rasittavaa liikkumista kerroit harrastavasi
								[kohta 2] min/vko. UKK:n suositusten mukaan
								rasittavaa liikkumista kannattaa tehdä 1 h 15
								min viikossa hyvän terveyskunnon
								ylläpitämiseksi.
							</Typography>
						</Box>
						<Box>
							-------------------------- GRAPH HERE
							--------------------------
						</Box>
						<Box>
							<Typography>
								Rasittavaa liikkumista harrastat tällä hetkellä:
								[kohta 7]
							</Typography>
						</Box>

						<Box style={{ backgroundColor: '#FFCCCB' }}>
							<Typography variant='h3'>
								OPTIONAL_ANSWERS_BELOW
							</Typography>
							<Typography>
								Olet valinnut teeman myös kehitettäväksi
								osa-alueeksi liikkumisessasi. Tulevaisuudessa
								tavoitteenasi on liikkua: [kohta 12 rasittava
								liikkuminen] min/vko ja tavoitteen saavutat:
								[kohta 12 avokenttä rasittava liikkuminen]  
							</Typography>
						</Box>
					</Box>

					<Box className='pdf_page' my={2}>
						<Box>
							<Typography color='primary' variant='h5'>
								Reipas liikkuminen
							</Typography>
						</Box>
						<Box>
							<Typography>
								Kevyttä liikkumista kerroit harrastavasi [kohta
								4] min/vko. UKK:n suositusten mukaan reipasta
								liikkumista kannattaa tehdä 2 h 30 min viikossa
								hyvän terveyskunnon ylläpitämiseksi.
							</Typography>
						</Box>
						<Box>
							-------------------------- GRAPH HERE
							--------------------------
						</Box>
						<Box>
							<Typography>
								Reipasta liikkumista harrastat tällä hetkellä:
								[kohta 8]
							</Typography>
						</Box>

						<Box style={{ backgroundColor: '#FFCCCB' }}>
							<Typography variant='h3'>
								OPTIONAL_ANSWERS_BELOW
							</Typography>
							<Typography>
								Olet valinnut teeman myös kehitettäväksi
								osa-alueeksi liikkumisessasi. Tulevaisuudessa
								tavoitteenasi on liikkua: [kohta 12 reipas
								liikkuminen] min/vko ja tavoitteen saavutat:
								[kohta 12 avokenttä reipas liikkuminen]  
							</Typography>
						</Box>
					</Box>

					<Box className='pdf_page' my={2}>
						<Box>
							<Typography color='primary' variant='h5'>
								Kevyttä liikuntaa
							</Typography>
						</Box>
						<Box>
							<Typography>
								Kevyttä liikkumista olet kertonut harrastavasi
								[kohta 4] krt/vko. UKK:n suositusten mukaan
								lihaskuntoa ja liikkeenhallintaa kannattaa tehdä
								2 kertaa viikossa hyvän terveyskunnon
								ylläpitämiseksi.
							</Typography>
						</Box>
						<Box>
							-------------------------- GRAPH HERE
							--------------------------
						</Box>
						<Box>
							<Typography>
								Kevyttä liikuntaa harrastat tällä hetkellä:
								[kohta 9]
							</Typography>
						</Box>

						<Box style={{ backgroundColor: '#FFCCCB' }}>
							<Typography variant='h3'>
								OPTIONAL_ANSWERS_BELOW
							</Typography>
							<Typography>
								Olet valinnut teeman myös kehitettäväksi
								osa-alueeksi liikkumisessasi. Tulevaisuudessa
								tavoitteenasi on liikkua: [kohta 12 kevyt
								liikkuminen] krt/vko ja tavoitteen saavutat:
								[kohta 12 avokenttä kevyt liikkuminen]
							</Typography>
						</Box>
					</Box>

					<Box className='pdf_page' my={2}>
						<Box>
							<Typography color='primary' variant='h5'>
								Taukoja paikallaanoloon
							</Typography>
						</Box>
						<Box>
							<Typography>
								Liikunnan ohella tauot paikallaan oloon
								virkistävät mieltä ja kehoa. Olet kertonut
								pitäväsi [kohta 5] taukoja viikossa. UKK:n
								suositusten mukaan taukoja kannattaa pitää
								paikallaanoloon aina kuin voi.
							</Typography>
						</Box>
						<Box>
							-------------------------- GRAPH HERE
							--------------------------
						</Box>
						<Box>
							<Typography>
								Paikallaolon tasapainoksi taukoja pidät tällä
								hetkellä: [kohta 10]
							</Typography>
						</Box>

						<Box style={{ backgroundColor: '#FFCCCB' }}>
							<Typography variant='h3'>
								OPTIONAL_ANSWERS_BELOW
							</Typography>
							<Typography>
								Olet valinnut teeman myös kehitettäväksi
								osa-alueeksi liikkumisessasi. Tulevaisuudessa
								tavoitteenasi on liikkua: [kohta 12 tauot
								paikallaoloon] krt/vko ja tavoitteen saavutat:
								[kohta 12 avokenttä tauot paikallaoloon]
							</Typography>
						</Box>
					</Box>
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
