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

	chartData(statistics: Statistic[]) {
		const temp: { categoryName: string; data: Array<any>; colorHEX: string }[] =
			[]

		this.statistics.forEach(record => {
			const categoryName = record.category.name

			const newChartRecord = {
				x: new Date(record.date).getTime(),
				y: record.count
			}

			const findedRecord = temp.find(item => item.categoryName === categoryName)

			if (findedRecord) {
				findedRecord.data.push(newChartRecord)
				return
			}

			temp.push({
				categoryName: categoryName,
				colorHEX: record.category.color.colorHEX,
				data: [newChartRecord]
			})
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
		new Chart('statistic-chart-canvas', {
			type: 'line',
			data: this.chartData(this.statistics),
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
				}
			}
		}).update()
	}
}
