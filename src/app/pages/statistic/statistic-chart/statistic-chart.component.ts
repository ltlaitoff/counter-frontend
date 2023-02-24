import { Component, Input, OnInit } from '@angular/core'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-moment'
import { Statistic } from 'src/types/Statistic'

@Component({
	selector: 'app-statistic-chart',
	templateUrl: './statistic-chart.component.html',
	styleUrls: ['./statistic-chart.component.scss']
})
export class StatisticChartComponent implements OnInit {
	@Input() statistics: Statistic[] = []
	currentChartType: 'day' | 'record' = 'day'

	// @ts-expect-error
	private chart: Chart

	changeChartType() {
		if (this.currentChartType === 'day') {
			this.currentChartType = 'record'
		} else {
			this.currentChartType = 'day'
		}

		this.chart.data = this.chartData(this.statistics, this.currentChartType)
		console.log(this.chart.data)

		this.chart.update()
	}

	chartData(statistics: Statistic[], type: 'day' | 'record' = 'day') {
		const temp: { categoryName: string; data: Array<any>; colorHEX: string }[] =
			[]

		statistics.forEach(record => {
			const categoryName = record.category.name

			let findedRecord = temp.find(item => item.categoryName === categoryName)

			if (findedRecord === undefined) {
				const index = temp.push({
					categoryName: categoryName,
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
				label: item.categoryName,
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

	ngOnInit(): void {
		this.chart = new Chart('statistic-chart-canvas', {
			type: 'line',
			data: this.chartData(this.statistics, this.currentChartType),
			options: {
				responsive: true,
				spanGaps: true,
				interaction: {
					intersect: false
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
		})
	}
}
