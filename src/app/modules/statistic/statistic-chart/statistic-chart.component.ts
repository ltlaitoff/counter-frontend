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
			data: this.chartData(this.statistics, this.chartDataInterval),
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
		this.chart.data = this.chartData(this.statistics, this.chartDataInterval)

		this.chart.update()
	}

	chartData(
		statistics: StatisticStateItemWithCategory[],
		type: 'day' | 'record' = 'day'
	) {
		const temp: {
			id: string
			name: string
			data: Array<any>
			colorHEX: string
		}[] = []

		statistics.forEach(record => {
			if (!record.category) return

			const id = record.category._id

			let findedRecord = temp.find(item => item.id === id)

			if (findedRecord === undefined) {
				const index = temp.push({
					id: id,
					name: record.category.name,
					colorHEX: record.category.color.colorHEX,
					data: []
				})

				findedRecord = temp[index - 1]
			}

			//===
			if (type === 'day') {
				const date = new Date(new Date(record.date).toDateString()).getTime()

				const findedRecordData = findedRecord.data.find(item => item.x === date)

				if (findedRecordData === undefined) {
					findedRecord.data.push({
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

				findedRecord.data.push({
					x: date,
					y: record.count
				})

				return
			}
		})

		const datasets = temp.map(item => {
			return {
				label: item.name,
				data: item.data,
				tension: 0.4,
				borderColor: item.colorHEX,
				backgroundColor: item.colorHEX
			}
		})

		return {
			datasets
		}
	}
}
