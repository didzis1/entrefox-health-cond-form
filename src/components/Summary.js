import React from 'react'
import PropTypes from 'prop-types'
import { dateToYMD, scrollToTop, getAnswerByID } from '../utils'
import { useForm } from '../contexts/FormContext'

// Summary components
import ButtonHandler from './ButtonHandler'
import StickyNote from './summaryComponents/StickyNote'
import HorizontalBarChart from './summaryComponents/HorizontalBarChart'
import Scroll from './summaryComponents/Scroll'

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
	const { formData } = useForm()

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

	const answers = {
		1: getAnswerByID(1, 1, formData).value,
		2: getAnswerByID(1, 2, formData).value,
		3: getAnswerByID(1, 3, formData).value,
		4: getAnswerByID(1, 4, formData).value,
		5: getAnswerByID(1, 5, formData).value,
		6: getAnswerByID(2, 6, formData).value,
		7: getAnswerByID(2, 7, formData).value,
		8: getAnswerByID(2, 8, formData).value,
		9: getAnswerByID(2, 9, formData).value,
		10: getAnswerByID(2, 10, formData).value,
		11: getAnswerByID(3, 11, formData).value,
		12: getAnswerByID(4, 12, formData).value ?? null,
		13: getAnswerByID(4, 13, formData).value ?? null,
		14: getAnswerByID(4, 14, formData).value ?? null,
		15: getAnswerByID(4, 15, formData).value ?? null,
		16: getAnswerByID(4, 16, formData).value ?? null,
		17: getAnswerByID(4, 17, formData).value ?? null,
		18: getAnswerByID(4, 18, formData).value ?? null,
		19: getAnswerByID(4, 19, formData).value ?? null,
		20: getAnswerByID(4, 20, formData).value ?? null,
		21: getAnswerByID(4, 21, formData).value ?? null
	}

	console.log(answers[11])

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
								harrastavasi {answers[1]}. UKK:n suositusten
								mukaan lihaskuntoa ja liikkeenhallintaa
								kannattaa tehdä 2 kertaa viikossa hyvän
								terveyskunnon ylläpitämiseksi.
							</Typography>
						</Box>
						<Box>GRAPH HERE</Box>
						<Box>
							<Typography>
								Lihaskuntoa ja liikkeenhallintaa ylläpidät tällä
								hetkellä:
								<StickyNote answer={answers[6]} />
							</Typography>
						</Box>

						{answers[11].find((answer) => answer.id === 1)
							.isChecked ? (
							<Box>
								<Typography>
									Olet valinnut teeman myös kehitettäväksi
									osa-alueeksi liikkumisessasi.
									Tulevaisuudessa tavoitteenasi on liikkua:{' '}
									{answers[12]} ja tavoitteen saavutat:
								</Typography>
								<Scroll answer={answers[13]} />
							</Box>
						) : null}
					</Box>

					<Box className='pdf_page' my={2}>
						<Box>
							<Typography color='primary' variant='h5'>
								Rasittava liikkuminen
							</Typography>
						</Box>
						<Box>
							<Typography>
								Rasittavaa liikkumista kerroit harrastavasi{' '}
								{answers[2]}. UKK:n suositusten mukaan
								rasittavaa liikkumista kannattaa tehdä 1 h 15
								min viikossa hyvän terveyskunnon
								ylläpitämiseksi.
							</Typography>
						</Box>
						<Box>
							<HorizontalBarChart
								title='Rasittava liikkuminen [min/vko]'
								recommended={75}
								current={answers[2]}
							/>
						</Box>
						<Box>
							<Typography>
								Rasittavaa liikkumista harrastat tällä hetkellä:
								<StickyNote answer={answers[7]} />
							</Typography>
						</Box>

						{answers[11].find((answer) => answer.id === 2)
							.isChecked ? (
							<Box>
								<Typography>
									Olet valinnut teeman myös kehitettäväksi
									osa-alueeksi liikkumisessasi.
									Tulevaisuudessa tavoitteenasi on liikkua:{' '}
									{answers[14]} ja tavoitteen saavutat:
								</Typography>
								<Scroll answer={answers[15]} />
							</Box>
						) : null}
					</Box>

					<Box className='pdf_page' my={8}>
						<Box>
							<Typography color='primary' variant='h5'>
								Reipas liikkuminen
							</Typography>
						</Box>
						<Box>
							<Typography>
								Kevyttä liikkumista kerroit harrastavasi{' '}
								{answers[3]}. UKK:n suositusten mukaan reipasta
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
								<StickyNote answer={answers[8]} />
							</Typography>
						</Box>

						{answers[11].find((answer) => answer.id === 3)
							.isChecked ? (
							<Box>
								<Typography>
									Olet valinnut teeman myös kehitettäväksi
									osa-alueeksi liikkumisessasi.
									Tulevaisuudessa tavoitteenasi on liikkua:{' '}
									{answers[16]} ja tavoitteen saavutat:
								</Typography>
								<Scroll answer={answers[17]} />
							</Box>
						) : null}
					</Box>

					<Box className='pdf_page' my={8}>
						<Box>
							<Typography color='primary' variant='h5'>
								Kevyttä liikuntaa
							</Typography>
						</Box>
						<Box>
							<Typography>
								Kevyttä liikkumista olet kertonut harrastavasi{' '}
								{answers[4]}. UKK:n suositusten mukaan
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
								<StickyNote answer={answers[9]} />
							</Typography>
						</Box>

						{answers[11].find((answer) => answer.id === 4)
							.isChecked ? (
							<Box>
								<Typography>
									Olet valinnut teeman myös kehitettäväksi
									osa-alueeksi liikkumisessasi.
									Tulevaisuudessa tavoitteenasi on liikkua:{' '}
									{answers[18]} ja tavoitteen saavutat:
								</Typography>
								<Scroll answer={answers[19]} />
							</Box>
						) : null}
					</Box>

					<Box className='pdf_page' my={8}>
						<Box>
							<Typography color='primary' variant='h5'>
								Taukoja paikallaanoloon
							</Typography>
						</Box>
						<Box>
							<Typography>
								Liikunnan ohella tauot paikallaan oloon
								virkistävät mieltä ja kehoa. Olet kertonut
								pitäväsi taukoja {answers[5]}. UKK:n suositusten
								mukaan taukoja kannattaa pitää paikallaanoloon
								aina kuin voi.
							</Typography>
						</Box>
						<Box>
							-------------------------- GRAPH HERE
							--------------------------
						</Box>
						<Box>
							<Typography>
								Paikallaolon tasapainoksi taukoja pidät tällä
								hetkellä:
								<StickyNote answer={answers[10]} />
							</Typography>
						</Box>

						{answers[11].find((answer) => answer.id === 5)
							.isChecked ? (
							<Box>
								<Typography>
									Olet valinnut teeman myös kehitettäväksi
									osa-alueeksi liikkumisessasi.
									Tulevaisuudessa tavoitteenasi on liikkua:{' '}
									{answers[20]} ja tavoitteen saavutat:
								</Typography>
								<Scroll answer={answers[21]} />
							</Box>
						) : null}
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
