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
								vuorokautesi tunnit jakautuvat työn, levon ja
								muun tekemisen välillä. Vaikka aikaa ei voi
								hallita, omaa ajankäyttöään voi suunnitella ja
								seurata. Näet alla rinnakkain, miten aikasi
								jakautuu nyt ja miten toivot, että se jakautuisi
								tulevaisuudessa.
							</Typography>
						</Box>
						<Box my={3}>
							<Typography align='center' variant='h5'>
								Aikasi nykyhetkellä
							</Typography>
							<PieChart answer={answers[1]} />
							<Typography align='center' variant='h5'>
								Aikasi tulevaisuudessa
							</Typography>
							<PieChart answer={answers[5]} />
						</Box>
						<Box>
							<Typography>
								Todennäköisesti yllä olevissa kuvioissa on
								todella eroavaisuuksia. Sinulla on ehkä tarve
								levätä lisää, saada ajatukset irti työstä
								tekemällä jotain sinua ilahduttavaa tai viettää
								aikaa yhdessä muiden kanssa. Keinot muuttaa
								sitä, mihin aikasi kuluu voi olla vaikeaa mutta
								se kannattaa. Kirjoita itsellesi ylös MITÄ tuo
								kaipaamasi muutos ajankäytössä tarkoittaa
								käytännössä: Mitä tekemistä lisäät elämääsi ja
								mistä puolestaan vähennät. Ole konkreettinen ja
								rehellinen itsellesi.
							</Typography>
						</Box>
						<Box className='html2pdf__page-break'></Box>
						<Box mt={2} mb={5}>
							<Typography>
								Olet vastannut, että haluat muutosta
								{typeof answers[4] === 'boolean'
									? ', mutta et ole asettanut muutoksen tavoitepäivän'
									: ` ja asettanut muutoksen tavoitepäiväksi ${dateToYMD(
											new Date(answers[4])
									  )}`}
								. Mitä tämä tarkoittaa lyhyellä aikavälillä?
								Kirjaa ylös ensi askeleet muutokset tiellä ja
								listaa muutosta. Mitkä ovat ensimmäiset askeleet
								muutoksen tiellä ja mikä tai kuka tukee sinua
								muutoksessa. Oman etenemisen seurannassa on hyvä
								laittaa itselle välitavoitteita ja kiittää
								itseään etenemisestä.
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
									vuorokautesi tunnit jakautuvat työn, levon
									ja muun tekemisen välillä. Vaikka aikaa ei
									voi hallita, omaa ajankäyttöään voi
									suunnitella ja seurata. Näet alla
									rinnakkain, miten aikasi jakautuu nyt ja
									miten toivot, että se jakautuisi
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
											Aikasi nykyhetkellä
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
									Jos yllä olevissa kuvioissa on eroja,
									sinulla ehkä on tarve levätä lisää, saada
									ajatukset irti työstä tekemällä jotain sinua
									ilahduttavaa tai viettää aikaa yhdessä
									muiden kanssa. Kirjoita itsellesi ylös mitä
									tuo kaipaamasi muutos ajankäytössä
									tarkoittaa käytännössä: mitä tekemistä
									haluat enemmän elämääsi ja mitä haluat
									vähentää. Ole avoin omille ideoillesi ja
									kunnioita arvojasi.
								</Typography>
							</Box>
						</Box>

						<Box className='html2pdf__page-break'></Box>

						<Box className='pdf_page'>
							<Box my={2}>
								<Typography>
									Vastasit, että olet kiinnostunut
									tavoittelemaan muutosta {answers[3]}{' '}
									{typeof answers[4] === 'boolean'
										? ', mutta et ole asettanut muutoksen tavoitepäivän.'
										: ` ja asettanut muutoksen tavoitepäiväksi ${dateToYMD(
												new Date(answers[4])
										  )}`}
									. Ideoi ensi askeleita kohti muutosta,
									kartoita muutoksen hidasteet ja kirjaa ylös
									mikä tai kuka voisi tukea sinua muutoksen
									toteuttamisessa. Oman etenemisen seurannassa
									on hyvä laittaa itselle välitavoitteita ja
									kiittää itseään etenemisestä.
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
								Näin arvioit, että aikasi jakautuu tällä
								hetkellä työn, unen ja muun ajan välillä.
							</Typography>
						</Box>

						<Box my={3}>
							<Grid
								container
								direction='row'
								justify='space-around'>
								<Grid item xs={12} sm={8} md={5}>
									<Typography align='center' variant='h5'>
										Yleinen ajankäyttö
									</Typography>
									<PieChart answer={answers[1]} />
								</Grid>
							</Grid>
						</Box>

						<Box>
							<Typography>
								Et halua muutosta, joten vaikuttaa sitä, että
								olet tyytyväinen nykytilanteeseen. Nyt on oikea
								aika kehua itseäsi: sinulla on homma hanskassa.
								Hienoa, että käytettävissä oleva aika menee
								oikeisiin asioihin, saat riittävästi aikaa
								itsellesi, työlle ja levolle.
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
									Vastasit haluavasi muutosta myös siihen,
									kuinka aikasi jakautuu eri työtehtävien
									välillä. Alla näet vertailua siitä, miten
									työtehtäväsi jakautuvat tällä hetkellä ja
									miten toivoisit, että ne jakautuisivat.
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
									Nyt voisi olla priorisoinnin tai töiden
									uudelleen järjestämisen paikka. Mieti,
									keskitytkö yrityksen ja oman jaksamisesi
									kannalta oikeisiin asioihin – myös pitkällä
									tähtäimellä. Ovatko kaikki aikaa syövät
									tehtävät välttämättömiä? Voiko niitä
									siirtää, delegoida tai jättää tekemättä?
									Ehkä tuttavapiirissäsi on yrittäjiä, joilla
									on energiaa vaikka muille jakaa. Kysy
									häneltä, miten hän on aikansa järjestänyt.
									Tekeekö hän ehkä yhteistyötä toisen
									yrittäjän kanssa markkinoinnissa ja
									myynnissä? Ehkä hän ostaa joitain palveluja
									yrityksensä pyörittämisen tueksi.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									Olet vastannut, että haluat muutosta
									työtehtäviesi ajankäytössä {answers[8]}
									{typeof answers[9] === 'boolean'
										? ', mutta et ole asettanut muutoksen tavoitepäivän'
										: ` ja asettanut muutoksen tavoitepäiväksi ${dateToYMD(
												new Date(answers[9])
										  )}`}
									. Aloita kartoittamalla tilanne: kirjaa
									viikon aikana ylös, mihin kaikkeen käytät
									omaa aikaasi. Merkitse asiat mahdollisimman
									tarkasti ja totuudenmukaisesti. Viikon
									päättyessä tarkastele omaa ajankäyttöäsi:
									mihin kaikkeen käytät aikasi ja löydätkö
									listasta niin sanottuja aikavarkaita?
									Tarkastelun jälkeen suunnittele haluamasi
									muutokset.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									Aseta itsellesi välitavoitteita ja hyödynnä
									apuvälineitä. Ota käyttöön neljän kohdan
									tehtävälistan, joka viikoittain käytettynä
									säästää aikaasi ja parantaa töiden
									hallittavuutta:{' '}
									<a
										href='https://www.entrefox.fi/arjen-ajanhallinta/'
										target='blank'
										className={classes.linkTag}>
										https://www.entrefox.fi/arjen-ajanhallinta/
									</a>
									. Hyödynnä sovelluksia, joissa voit ajastaa
									työtehtäviä. Näitä ovat muun muassa Todoist{' '}
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
									. Etsi myös itsellesi ‘ajanhallintakaveri’.
									Tämä voi olla ystävä tai hengenheimolainen,
									jolta saat vertaistukea, tai
									vaihtoehtoisesti kokeneempi ’coachi’, jolta
									saat kommentteja ja ideoita ajankäyttöösi.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									Vastasit myös, että suunnittelet
									työtehtäviäsi tällä hetkellä näin:{' '}
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
									Kysy itseltäsi, onko tämä suunnittelun
									aikaväli riittävä ja tukeeko nykyinen tapasi
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
									Olet kiinnostunut pohtimaan sitä, miten
									aikasi kuluu eri työtehtäviin. Ehkä kaipaat
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
									Nyt voi olla priorisoinnin tai töiden
									uudelleen järjestämisen paikka. Mieti,
									keskitytkö yrityksen ja oman jaksamisesi
									kannalta oikeisiin asioihin – myös pitkällä
									tähtäimellä. Keinot muuttaa sitä, mihin
									työtehtäviin aikasi kuluu voi olla vaikeaa
									etkä ole muutoksen tarpeellisuudesta täysin
									varma. Kartoita silti tilanne: ehkä
									tuttavapiirissäsi on yrittäjiä, joilla on
									energiaa vaikka muille jakaa. Kysy häneltä,
									miten hän on aikansa järjestänyt. Tekeekö
									hän ehkä yhteistyötä toisen yrittäjän kanssa
									markkinoinnissa ja myynnissä? Ehkä hän ostaa
									joitain palveluja yrityksensä pyörittämisen
									tueksi.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									Vastasit, että olet kiinnostunut
									tavoittelemaan muutosta työtehtävien
									ajankäytössä {answers[8]}{' '}
									{typeof answers[9] === 'boolean'
										? ', mutta et ole asettanut muutoksen tavoitepäivän.'
										: ` ja asettanut muutoksen tavoitepäiväksi ${dateToYMD(
												new Date(answers[4])
										  )}`}
									. Seuraa viikon aikana sitä, mihin työaikasi
									kuluu. Merkitse asiat mahdollisimman
									tarkasti ja totuudenmukaisesti. Viikon
									päättyessä voit tarkastella omaa
									ajankäyttöäsi: mihin kaikkeen käytät aikaasi
									ja löydätkö listasta niin sanottuja
									aikavarkaita? Tarkastelun jälkeen sinun on
									parempi käsitys muutostarpeista.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									Välitavoitteiden asettaminen ja
									apuvälineiden käyttö tukee muutosta. Kokeile
									neljän kohdan tehtävälistaa, joka
									viikoittain käytettynä säästää aikaasi ja
									parantaa töiden hallittavuutta:{' '}
									<a
										href='https://www.entrefox.fi/arjen-ajanhallinta/'
										target='blank'
										className={classes.linkTag}>
										https://www.entrefox.fi/arjen-ajanhallinta/
									</a>
									. Hyödynnä kalenteria ja sovelluksia, joissa
									voit ajastaa työtehtäviä. Näitä ovat muun
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
									Juttele muiden samantapaista työtä tekevien
									kanssa siitä, miten he käyttävät työaikansa.
									Tämä voi olla ystävä tai hengenheimolainen,
									jolta saat vertaistukea, tai
									vaihtoehtoisesti kokeneempi ’coachi’, jolta
									saat kommentteja ja ideoita ajankäyttöösi.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									Vastasit myös, että suunnittelet
									työtehtäviäsi tällä hetkellä näin:{' '}
									<Typography
										component='span'
										color='primary'
										style={{ fontWeight: 600 }}>
										{answerEleven()}
									</Typography>
									. Kysy itseltäsi, onko tämä suunnittelun
									aikaväli sinulle ja pohtimallesi muutokselle
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
								Näin arvioit, että aikasi jakautuu eri
								työtehtävien välillä
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
									Muutokset ja kausivaihtelut ovat yrittäjille
									hyvin tyyppilisiä. Nyt kun aika on
									hallinnassa, pohdi voisitko varautua näihin
									muutoksiin jo etukäteen, esimerkiksi
									kehittämällä uutta tai syventämällä jo
									olemassa olevia taitojasi. Lisäksi voit
									miettiä pitkän aikavälin ajanhallintaa.
								</Typography>
							</Box>

							<Box my={2}>
								<Typography>
									Vastasit myös, että suunnittelet
									työtehtäviäsi tällä hetkellä näin:{' '}
									<Typography
										component='span'
										color='primary'
										style={{ fontWeight: 600 }}>
										{answerEleven()}.
									</Typography>
									{''}Kysy itseltäsi onko tämä mielestäsi
									toimiva ratkaisu tällä hetkellä ja
									pidemmällä aikavälillä. Pitkän aikavälin
									suunnittelu on hyvä palauttaa niihin
									tekijöihin, mitkä ovat elämässä tärkeitä ja
									mihin haluaisit panostaa enemmän.
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
