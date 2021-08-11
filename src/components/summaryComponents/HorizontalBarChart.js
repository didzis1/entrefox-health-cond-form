import React from 'react'
import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'

// Material UI
import Box from '@material-ui/core/Box'

// eslint-disable-next-line no-unused-vars
const HorizontalBarChart = ({ title, recommended, current }) => {
	const data = {
		labels: ['Nykytila', 'Suositus'],
		datasets: [
			{
				label: '',
				data: [2.5, 6],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}
		]
	}

	const options = {
		indexAxis: 'y',
		elements: {
			bar: {
				borderWidth: 2
			}
		},
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true,
				text: title
			}
		}
	}
	return (
		<Box style={{ height: '250px', width: '100%' }}>
			<Bar data={data} options={options} />
		</Box>
	)
}

HorizontalBarChart.propTypes = {
	title: PropTypes.string,
	recommended: PropTypes.number,
	current: PropTypes.string
}

export default HorizontalBarChart
