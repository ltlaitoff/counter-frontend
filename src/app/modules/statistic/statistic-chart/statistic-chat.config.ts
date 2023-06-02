import { ChartOptions } from 'chart.js'

export const CHART_OPTIONS: ChartOptions<'line'> = {
	responsive: true,
	spanGaps: true,

	interaction: {
		intersect: false,
		mode: 'x'
	},
	scales: {
		x: {
			type: 'time',
			time: {
				unit: 'day'
			}
		},
		yNumber: {
			type: 'linear',
			display: true,
			position: 'left'
		},
		yTime: {
			type: 'time',
			display: true,
			position: 'right',
			min: 0,
			adapters: {
				date: {
					locale: 'en-GB',
					zone: 'utc'
				}
			},
			ticks: {
				stepSize: 60
			},
			time: {
				tooltipFormat: 'HH:mm:ss',
				unit: 'minute',
				displayFormats: {
					day: 'dd HH:mm:ss.SSS',
					millisecond: 'HH:mm:ss.SSS',
					second: 'HH:mm:ss',
					minute: 'HH:mm',
					hour: 'HH'
				}
			},

			grid: {
				drawOnChartArea: false
			}
		}
	},
	animation: {
		duration: 400
	},
	animations: {
		y: { duration: 0 }
	}
}
