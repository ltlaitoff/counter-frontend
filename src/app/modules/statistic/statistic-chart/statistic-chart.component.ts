import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-moment'
import { StatisticStateItemWithCategory } from 'src/app/store/statistic/statistic.types'
import { CHART_OPTIONS } from './statistic-chat.config'

@Component({
	selector: 'counter-statistic-chart',
	templateUrl: './statistic-chart.component.html',
	styleUrls: ['./statistic-chart.component.scss']
})
export class StatisticChartComponent implements OnChanges {
	@Input() statistics: StatisticStateItemWithCategory[] = []
	chartDataInterval: 'day' | 'record' = 'day'
	chartDataBy: 'category' | 'group' = 'category'

	private chart!: Chart

	ngOnInit() {
		this.chart = new Chart('statistic-chart-canvas', {
			type: 'line',
			data: {
				datasets: this.getChartDataset(this.statistics, this.chartDataInterval)
			},
			options: CHART_OPTIONS
		})
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['statistics'].firstChange) return

		this.updateChartData()
	}

	changeChartType() {
		if (this.chartDataInterval === 'day') {
			this.chartDataInterval = 'record'
		} else {
			this.chartDataInterval = 'day'
		}

		this.updateChartData()
	}

	private updateChartData() {
		this.chart.data.datasets = this.getChartDataset(
			this.statistics,
			this.chartDataInterval
		)

		this.chart.update()
	}

	getChartDataset(
		statistics: StatisticStateItemWithCategory[],
		type: 'day' | 'record' = 'day'
	) {
		const rawDatasets = this.getRawDatasets(statistics, type)

		return rawDatasets.map(item => ({
			label: item.name,
			data: item.data,
			tension: 0.4,
			borderColor: item.colorHEX,
			backgroundColor: item.colorHEX
		}))
	}

	private getRawDatasets(
		statistics: StatisticStateItemWithCategory[],
		type: 'day' | 'record' = 'day'
	) {
		const rawDatasets: {
			id: string
			name: string
			data: Array<any>
			colorHEX: string
		}[] = []

		statistics.forEach(record => {
			if (!record.category) return

			const rawDataset = this.findOrCreateRawDataset(
				{
					id: record.category._id,
					name: record.category.name,
					colorHEX: record.category.color.colorHEX
				},
				rawDatasets
			)

			this.updateDatasetData(
				type,
				{ date: record.date, count: record.count },
				rawDataset
			)
		})

		return rawDatasets
	}

	private findOrCreateRawDataset(
		data: {
			id: string
			name: string
			colorHEX: string
		},
		rawDatasets: {
			id: string
			name: string
			data: Array<any>
			colorHEX: string
		}[]
	) {
		const rawDataset = rawDatasets.find(item => item.id === data.id)

		if (rawDataset !== undefined) return rawDataset

		const index = rawDatasets.push({
			id: data.id,
			name: data.name,
			colorHEX: data.colorHEX,
			data: []
		})

		return rawDatasets[index - 1]
	}

	updateDatasetData(
		type: 'day' | 'record',
		record: { date: string; count: number },
		rawDataset: {
			id: string
			name: string
			data: Array<any>
			colorHEX: string
		}
	) {
		if (type === 'day') {
			const date = new Date(new Date(record.date).toDateString()).getTime()

			const findedRecordData = rawDataset.data.find(item => item.x === date)

			if (findedRecordData === undefined) {
				rawDataset.data.push({
					x: date,
					y: record.count
				})
				return
			}

			findedRecordData.y += record.count
			return
		}

		if (type === 'record') {
			const date = new Date(record.date).getTime()

			rawDataset.data.push({
				x: date,
				y: record.count
			})

			return
		}
	}
}
