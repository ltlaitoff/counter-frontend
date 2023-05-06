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
		}
	},
	animation: {
		duration: 400
	},
	animations: {
		y: { duration: 0 }
	}
}
