import React from 'react'
import PieChart from './PieChart'
import WorkTable from './WorkTable'
import { useForm } from '../../contexts/FormContext'
import { getAnswerByID, dateToYMD } from '../../utils'

//Material UI
import useStyles from '../../styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

const SummaryContent = () => {
	const classes = useStyles()
	const { formData } = useForm()

	const answers = {
		1: getAnswerByID(1, 1, formData)?.value,
		2: getAnswerByID(2, 2, formData),
		3: getAnswerByID(3, 3, formData)?.value?.text.toLowerCase(),
		4: getAnswerByID(3, 4, formData)?.value,
		5: getAnswerByID(3, 5, formData)?.value,
		6: getAnswerByID(3, 6, formData),
		7: getAnswerByID(4, 7, formData),
		8: getAnswerByID(5, 8, formData)?.value?.text.toLowerCase(),
		9: getAnswerByID(5, 9, formData)?.value,
		10: getAnswerByID(5, 10, formData),
		11: getAnswerByID(5, 11, formData).value.filter(
			(answer) => answer.isChecked
		)
	}

	const optionalAnswers = {
		1: answers[6].value.find((answer) => answer.id === 8)?.textAnswer.text,
		2: answers[10].value.find((answer) => answer.id === 8)?.textAnswer.text
	}

	// Format sentence for answer 11
	const answerEleven = () => {
		//words.slice(0, -1).join(', ') + ' and ' + words.splice(-1)
		let mappedAnswers = answers[11].map((answer, index) =>
			index >= 1 ? answer.text.toLowerCase() : answer.text
		)

		if (answers[11].length === 1) {
			return mappedAnswers
		} else if (answers[11].length === 2) {
			return mappedAnswers.join(' ja ')
		} else if (answers[11].length >= 3) {
			return (
				mappedAnswers.slice(0, -1).join(', ') +
				' ja ' +
				mappedAnswers.splice(-1)
			)
		}
	}

	// pdf_page class and last-pdf-page ID is used in downloadPDF function in Summary.js file
	// Giving a className='html2pdf__page-break' to an element will brake the page at that point in PDF

	const possibleOutcomes = [
		{
			id: 1,
			question: 2,
			condition: 'YES',
			content: function Content(key) {
				return (
					<Box key={key} my={2} className='pdf_page'>
						<Box>
							<Typography>
								Olet vastannut haluavasi muutosta siihen miten
								vuorokautesi tunnit jakautuvat ty??n, levon ja
								muun tekemisen v??lill??. Vaikka aikaa ei voi
								hallita, omaa ajank??ytt??????n voi suunnitella ja
								seurata. N??et alla rinnakkain, miten aikasi
								jakautuu nyt ja miten toivot, ett?? se jakautuisi
								tulevaisuudessa.
							</Typography>
						</Box>
						<Box my={3}>
							<Typography align='center' variant='h5'>
								Aikasi nykyhetkell??
							</Typography>
							<PieChart answer={answers[1]} />
							<Typography align='center' variant='h5'>
								Aikasi tulevaisuudessa
							</Typography>
							<PieChart answer={answers[5]} />
						</Box>
						<Box>
							<Typography>
								Todenn??k??isesti yll?? olevissa kuvioissa on
								todella eroavaisuuksia. Sinulla on ehk?? tarve
								lev??t?? lis????, saada ajatukset irti ty??st??
								tekem??ll?? jotain sinua ilahduttavaa tai viett????
								aikaa yhdess?? muiden kanssa. Keinot muuttaa
								sit??, mihin aikasi kuluu voi olla vaikeaa mutta
								se kannattaa. Kirjoita itsellesi yl??s MIT?? tuo
								kaipaamasi muutos ajank??yt??ss?? tarkoittaa
								k??yt??nn??ss??: Mit?? tekemist?? lis????t el??m????si ja
								mist?? puolestaan v??henn??t. Ole konkreettinen ja
								rehellinen itsellesi.
							</Typography>
						</Box>
						<Box className='html2pdf__page-break'></Box>
						<Box mt={2} mb={5}>
							<Typography>
								Olet vastannut, ett?? haluat muutosta
								{typeof answers[4] === 'boolean'
									? ', mutta et ole asettanut muutoksen tavoitep??iv??n'
									: ` ja asettanut muutoksen tavoitep??iv??ksi ${dateToYMD(
											new Date(answers[4])
									  )}`}
								. Mit?? t??m?? tarkoittaa lyhyell?? aikav??lill???
								Kirjaa yl??s ensi askeleet muutokset tiell?? ja
								listaa muutosta. Mitk?? ovat ensimm??iset askeleet
								muutoksen tiell?? ja mik?? tai kuka tukee sinua
								muutoksessa. Oman etenemisen seurannassa on hyv??
								laittaa itselle v??litavoitteita ja kiitt????
								itse????n etenemisest??.
							</Typography>
						</Box>
						<Box className='html2pdf__page-break'></Box>
						<Divider data-html2canvas-ignore='true' />
					</Box>
				)
			}
		},
		{
			id: 2,
			question: 2,
			condition: 'MAYBE',
			content: function Content(key) {
				return (
					<Box key={key} my={3}>
						<Box className='pdf_page'>
							<Box>
								<Typography>
									Sinussa kytee kiinnostus pohtia miten
									vuorokautesi tunnit jakautuvat ty??n, levon
									ja muun tekemisen v??lill??. Vaikka aikaa ei
									voi hallita, omaa ajank??ytt??????n voi
									suunnitella ja seurata. N??et alla
									rinnakkain, miten aikasi jakautuu nyt ja
									miten toivot, ett?? se jakautuisi
									tulevaisuudessa
								</Typography>
							</Box>

							<Box my={3}>
								<Grid
									container
									direction='row'
									justify='space-around'>
									<Grid item xs={12}>
										<Typography align='center' variant='h5'>
											Aikasi nykyhetkell??
										</Typography>
										<PieChart answer={answers[1]} />
									</Grid>
									<Grid item xs={12}>
										<Typography align='center' variant='h5'>
											Aikasi tulevaisuudessa
										</Typography>
										<PieChart answer={answers[5]} />
									</Grid>
								</Grid>
							</Box>

							<Box my={2}>
								<Typography>
									Jos yll?? olevissa kuvioissa on eroja,
									sinulla ehk?? on tarve lev??t?? lis????, saada
									ajatukset irti ty??st?? tekem??ll?? jotain sinua
									ilahduttavaa tai viett???? aikaa yhdess??
									muiden kanssa. Kirjoita itsellesi yl??s mit??
									tuo kaipaamasi muutos ajank??yt??ss??
									tarkoittaa k??yt??nn??ss??: mit?? tekemist??
									haluat enemm??n el??m????si ja mit?? haluat
									v??hent????. Ole avoin omille ideoillesi ja
									kunnioita arvojasi.
								</Typography>
							</Box>
						</Box>

						<Box className='html2pdf__page-break'></Box>

						<Box className='pdf_page'>
							<Box my={2}>
								<Typography>
									Vastasit, ett?? olet kiinnostunut
									tavoittelemaan muutosta {answers[3]}{' '}
									{typeof answers[4] === 'boolean'
										? ', mutta et ole asettanut muutoksen tavoitep??iv??n.'
										: ` ja asettanut muutoksen tavoitep??iv??ksi ${dateToYMD(
												new Date(answers[4])
										  )}`}
									. Ideoi ensi askeleita kohti muutosta,
									kartoita muutoksen hidasteet ja kirjaa yl??s
									mik?? tai kuka voisi tukea sinua muutoksen
									toteuttamisessa. Oman etenemisen seurannassa
									on hyv?? laittaa itselle v??litavoitteita ja
									kiitt???? itse????n etenemisest??.
								</Typography>
							</Box>
						</Box>

						<Box className='html2pdf__page-break'></Box>

						<Box my={3}>
							<Divider data-html2canvas-ignore='true' />
						</Box>
					</Box>
				)
			}
		},
		{
			id: 3,
			question: 2,
			condition: 'NO',
			content: function Content(key) {
				return (
					<Box key={key} my={3} className='pdf_page'>
						<Box>
							<Typography>
								N??in arvioit, ett?? aikasi jakautuu t??ll??
								hetkell?? ty??n, unen ja muun ajan v??lill??.
							</Typography>
						</Box>

						<Box my={3}>
							<Grid
								container
								direction='row'
								justify='space-around'>
								<Grid item xs={12} sm={8} md={5}>
									<Typography align='center' variant='h5'>
										Yleinen ajank??ytt??
									</Typography>
									<PieChart answer={answers[1]} />
								</Grid>
							</Grid>
						</Box>

						<Box>
							<Typography>
								Et halua muutosta, joten vaikuttaa sit??, ett??
								olet tyytyv??inen nykytilanteeseen. Nyt on oikea
								aika kehua itse??si: sinulla on homma hanskassa.
								Hienoa, ett?? k??ytett??viss?? oleva aika menee
								oikeisiin asioihin, saat riitt??v??sti aikaa
								itsellesi, ty??lle ja levolle.
							</Typography>
						</Box>

						<Box className='html2pdf__page-break'></Box>

						<Box my={3}>
							<Divider data-html2canvas-ignore='true' />
						</Box>
					</Box>
				)
			}
		},
		{
			id: 4,
			question: 7,
			condition: 'YES',
			content: function Content(key) {
				return (
					<Box key={key} mt={2}>
						<Box className='pdf_page'>
							<Box>
								<Typography>
									Vastasit haluavasi muutosta my??s siihen,
									kuinka aikasi jakautuu eri ty??teht??vien
									v??lill??. Alla n??et vertailua siit??, miten
									ty??teht??v??si jakautuvat t??ll?? hetkell?? ja
									miten toivoisit, ett?? ne jakautuisivat.
								</Typography>
							</Box>

							<Box my={3}>
								<WorkTable
									present={answers[6]}
									future={answers[10]}
								/>
							</Box>
							<Box>
								<Typography>
									{optionalAnswers[1]
										? 'Nykyinen muu toiminta: ' +
										  optionalAnswers[1]
										: null}
								</Typography>
								<Typography>
									{optionalAnswers[2]
										? 'Tulevaisuuden muu toimintasi: ' +
										  optionalAnswers[2]
										: null}
								</Typography>
							</Box>
						</Box>

						<Box className='html2pdf__page-break'></Box>

						<Box id='last-pdf-page' className='pdf_page'>
							<Box mt={2}>
								<Typography>
									Nyt voisi olla priorisoinnin tai t??iden
									uudelleen j??rjest??misen paikka. Mieti,
									keskitytk?? yrityksen ja oman jaksamisesi
									kannalta oikeisiin asioihin ??? my??s pitk??ll??
									t??ht??imell??. Ovatko kaikki aikaa sy??v??t
									teht??v??t v??ltt??m??tt??mi??? Voiko niit??
									siirt????, delegoida tai j??tt???? tekem??tt???
									Ehk?? tuttavapiiriss??si on yritt??ji??, joilla
									on energiaa vaikka muille jakaa. Kysy
									h??nelt??, miten h??n on aikansa j??rjest??nyt.
									Tekeek?? h??n ehk?? yhteisty??t?? toisen
									yritt??j??n kanssa markkinoinnissa ja
									myynniss??? Ehk?? h??n ostaa joitain palveluja
									yrityksens?? py??ritt??misen tueksi.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									Olet vastannut, ett?? haluat muutosta
									ty??teht??viesi ajank??yt??ss?? {answers[8]}
									{typeof answers[9] === 'boolean'
										? ', mutta et ole asettanut muutoksen tavoitep??iv??n'
										: ` ja asettanut muutoksen tavoitep??iv??ksi ${dateToYMD(
												new Date(answers[9])
										  )}`}
									. Aloita kartoittamalla tilanne: kirjaa
									viikon aikana yl??s, mihin kaikkeen k??yt??t
									omaa aikaasi. Merkitse asiat mahdollisimman
									tarkasti ja totuudenmukaisesti. Viikon
									p????ttyess?? tarkastele omaa ajank??ytt????si:
									mihin kaikkeen k??yt??t aikasi ja l??yd??tk??
									listasta niin sanottuja aikavarkaita?
									Tarkastelun j??lkeen suunnittele haluamasi
									muutokset.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									Aseta itsellesi v??litavoitteita ja hy??dynn??
									apuv??lineit??. Ota k??ytt????n nelj??n kohdan
									teht??v??listan, joka viikoittain k??ytettyn??
									s????st???? aikaasi ja parantaa t??iden
									hallittavuutta:{' '}
									<a
										href='https://www.entrefox.fi/arjen-ajanhallinta/'
										target='blank'
										className={classes.linkTag}>
										https://www.entrefox.fi/arjen-ajanhallinta/
									</a>
									. Hy??dynn?? sovelluksia, joissa voit ajastaa
									ty??teht??vi??. N??it?? ovat muun muassa Todoist{' '}
									<a
										href='https://todoist.com/app/today'
										target='blank'
										className={classes.linkTag}>
										https://todoist.com/app/today
									</a>{' '}
									ja Keep my notes{' '}
									<a
										href='https://www.kitetech.co/keepmynotes'
										target='blank'
										className={classes.linkTag}>
										https://www.kitetech.co/keepmynotes
									</a>
									. Etsi my??s itsellesi ???ajanhallintakaveri???.
									T??m?? voi olla yst??v?? tai hengenheimolainen,
									jolta saat vertaistukea, tai
									vaihtoehtoisesti kokeneempi ???coachi???, jolta
									saat kommentteja ja ideoita ajank??ytt????si.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									Vastasit my??s, ett?? suunnittelet
									ty??teht??vi??si t??ll?? hetkell?? n??in:{' '}
									<Typography
										component='span'
										color='primary'
										style={{ fontWeight: 600 }}>
										{answerEleven()}.
									</Typography>{' '}
								</Typography>
							</Box>
							<Box my={2}>
								<Typography>
									Kysy itselt??si, onko t??m?? suunnittelun
									aikav??li riitt??v?? ja tukeeko nykyinen tapasi
									suunnitella haluamaasi muutosta.
								</Typography>
							</Box>
						</Box>
						<Box my={4}>
							<Divider data-html2canvas-ignore='true' />
						</Box>
					</Box>
				)
			}
		},
		{
			id: 5,
			question: 7,
			condition: 'MAYBE',
			content: function Content(key) {
				return (
					<Box key={key} my={3}>
						<Box className='pdf_page'>
							<Box>
								<Typography>
									Olet kiinnostunut pohtimaan sit??, miten
									aikasi kuluu eri ty??teht??viin. Ehk?? kaipaat
									siihen muutosta. Tarkastele alla olevan
									koostetta omista vastauksistasi.
								</Typography>
							</Box>

							<Box my={3}>
								<WorkTable
									present={answers[6]}
									future={answers[10]}
								/>
							</Box>
							<Box>
								<Typography>
									{optionalAnswers[1]
										? 'Nykyinen muu toiminta: ' +
										  optionalAnswers[1]
										: null}
								</Typography>
								<Typography>
									{optionalAnswers[2]
										? 'Tulevaisuuden muu toimintasi: ' +
										  optionalAnswers[2]
										: null}
								</Typography>
							</Box>
						</Box>

						<Box className='html2pdf__page-break'></Box>

						<Box className='pdf_page' id='last-pdf-page'>
							<Box my={2}>
								<Typography>
									Nyt voi olla priorisoinnin tai t??iden
									uudelleen j??rjest??misen paikka. Mieti,
									keskitytk?? yrityksen ja oman jaksamisesi
									kannalta oikeisiin asioihin ??? my??s pitk??ll??
									t??ht??imell??. Keinot muuttaa sit??, mihin
									ty??teht??viin aikasi kuluu voi olla vaikeaa
									etk?? ole muutoksen tarpeellisuudesta t??ysin
									varma. Kartoita silti tilanne: ehk??
									tuttavapiiriss??si on yritt??ji??, joilla on
									energiaa vaikka muille jakaa. Kysy h??nelt??,
									miten h??n on aikansa j??rjest??nyt. Tekeek??
									h??n ehk?? yhteisty??t?? toisen yritt??j??n kanssa
									markkinoinnissa ja myynniss??? Ehk?? h??n ostaa
									joitain palveluja yrityksens?? py??ritt??misen
									tueksi.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									Vastasit, ett?? olet kiinnostunut
									tavoittelemaan muutosta ty??teht??vien
									ajank??yt??ss?? {answers[8]}{' '}
									{typeof answers[9] === 'boolean'
										? ', mutta et ole asettanut muutoksen tavoitep??iv??n.'
										: ` ja asettanut muutoksen tavoitep??iv??ksi ${dateToYMD(
												new Date(answers[4])
										  )}`}
									. Seuraa viikon aikana sit??, mihin ty??aikasi
									kuluu. Merkitse asiat mahdollisimman
									tarkasti ja totuudenmukaisesti. Viikon
									p????ttyess?? voit tarkastella omaa
									ajank??ytt????si: mihin kaikkeen k??yt??t aikaasi
									ja l??yd??tk?? listasta niin sanottuja
									aikavarkaita? Tarkastelun j??lkeen sinun on
									parempi k??sitys muutostarpeista.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									V??litavoitteiden asettaminen ja
									apuv??lineiden k??ytt?? tukee muutosta. Kokeile
									nelj??n kohdan teht??v??listaa, joka
									viikoittain k??ytettyn?? s????st???? aikaasi ja
									parantaa t??iden hallittavuutta:{' '}
									<a
										href='https://www.entrefox.fi/arjen-ajanhallinta/'
										target='blank'
										className={classes.linkTag}>
										https://www.entrefox.fi/arjen-ajanhallinta/
									</a>
									. Hy??dynn?? kalenteria ja sovelluksia, joissa
									voit ajastaa ty??teht??vi??. N??it?? ovat muun
									muassa Todoist{' '}
									<a
										href='https://todoist.com/app/today'
										target='blank'
										className={classes.linkTag}>
										https://todoist.com/app/today
									</a>{' '}
									ja Keep My Notes{' '}
									<a
										href='https://www.kitetech.co/keepmynotes'
										target='blank'
										className={classes.linkTag}>
										https://www.kitetech.co/keepmynotes .
									</a>{' '}
									Juttele muiden samantapaista ty??t?? tekevien
									kanssa siit??, miten he k??ytt??v??t ty??aikansa.
									T??m?? voi olla yst??v?? tai hengenheimolainen,
									jolta saat vertaistukea, tai
									vaihtoehtoisesti kokeneempi ???coachi???, jolta
									saat kommentteja ja ideoita ajank??ytt????si.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									Vastasit my??s, ett?? suunnittelet
									ty??teht??vi??si t??ll?? hetkell?? n??in:{' '}
									<Typography
										component='span'
										color='primary'
										style={{ fontWeight: 600 }}>
										{answerEleven()}
									</Typography>
									. Kysy itselt??si, onko t??m?? suunnittelun
									aikav??li sinulle ja pohtimallesi muutokselle
									sopiva.
								</Typography>
							</Box>
						</Box>
						<Box my={3}>
							<Divider data-html2canvas-ignore='true' />
						</Box>
					</Box>
				)
			}
		},
		{
			id: 6,
			question: 7,
			condition: 'NO',
			content: function Content(key) {
				return (
					<Box key={key} my={3}>
						<Box className='pdf_page'>
							<Typography>
								N??in arvioit, ett?? aikasi jakautuu eri
								ty??teht??vien v??lill??
							</Typography>
							<Box my={3}>
								<WorkTable present={answers[6]} />
							</Box>
							<Box>
								<Typography>
									{optionalAnswers[1]
										? 'Nykyinen muu toiminta: ' +
										  optionalAnswers[1]
										: null}
								</Typography>
							</Box>
						</Box>

						<Box className='html2pdf__page-break'></Box>

						<Box className='pdf_page' id='last-pdf-page'>
							<Box my={2}>
								<Typography>
									Muutokset ja kausivaihtelut ovat yritt??jille
									hyvin tyyppilisi??. Nyt kun aika on
									hallinnassa, pohdi voisitko varautua n??ihin
									muutoksiin jo etuk??teen, esimerkiksi
									kehitt??m??ll?? uutta tai syvent??m??ll?? jo
									olemassa olevia taitojasi. Lis??ksi voit
									mietti?? pitk??n aikav??lin ajanhallintaa.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									Vastasit my??s, ett?? suunnittelet
									ty??teht??vi??si t??ll?? hetkell?? n??in:{' '}
									<Typography
										component='span'
										color='primary'
										style={{ fontWeight: 600 }}>
										{answerEleven()}.
									</Typography>
									{''}Kysy itselt??si onko t??m?? mielest??si
									toimiva ratkaisu t??ll?? hetkell?? ja
									pidemm??ll?? aikav??lill??. Pitk??n aikav??lin
									suunnittelu on hyv?? palauttaa niihin
									tekij??ihin, mitk?? ovat el??m??ss?? t??rkeit?? ja
									mihin haluaisit panostaa enemm??n.
								</Typography>
							</Box>
						</Box>

						<Box my={3}>
							<Divider data-html2canvas-ignore='true' />
						</Box>
					</Box>
				)
			}
		}
	]

	// Render outcomes depending on what the user answered on questions 2 and 7
	const outcomesToRender = possibleOutcomes.filter((outcome) => {
		if (
			outcome.question === answers[2].id &&
			outcome.condition === answers[2]?.value.condition
		) {
			return outcome
		}
		if (
			outcome.question === answers[7].id &&
			outcome.condition === answers[7]?.value.condition
		) {
			return outcome
		}
		return null
	})
	return outcomesToRender.map((outcome) => outcome.content(outcome.id))
}

export default SummaryContent
