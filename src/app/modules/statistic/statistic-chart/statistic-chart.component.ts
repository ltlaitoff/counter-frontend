import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnChanges,
	SimpleChanges
} from '@angular/core'
import { Store } from '@ngrx/store'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-moment'
import 'chartjs-adapter-luxon'
import { RootState } from 'src/app/store'
import { selectCategoryGroups } from 'src/app/store/category-groups/category-groups.select'
import { CategoryGroupsStateItemWithColor } from 'src/app/store/category-groups/category-groups.types'
import { StatisticStateItemWithCategory } from 'src/app/store/statistic/statistic.types'
import { ChartDataset } from './statistic-chart.types'
import { CHART_OPTIONS } from './statistic-chat.config'
import { ChartInterval, ChartBy, Mode } from '../statistic.types'
import * as moment from 'moment'

@Component({
	selector: 'counter-statistic-chart',
	templateUrl: './statistic-chart.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticChartComponent implements OnChanges {
	@Input() statistics: StatisticStateItemWithCategory[] = []
	categoryGroups: Record<string, CategoryGroupsStateItemWithColor> = {}

	@Input({ required: true }) interval: ChartInterval = 'day'
	@Input({ required: true }) by: ChartBy = 'category'
	@Input({ required: true }) mode: Mode = 'all'

	private chart!: Chart

	ngOnInit() {
		this.store.select(selectCategoryGroups).subscribe(value => {
			this.categoryGroups = value.reduce((acc, item) => {
				return { ...acc, [item._id]: item }
			}, {})
		})

		this.initializeChart()
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['statistics'] && changes['statistics'].firstChange) return

		this.updateChartData()
	}

	updateChartData() {
		this.updateChartDatasets()
		this.updateChartOptions()

		this.chart.update()
	}

	getChartDatasets(
		statistics: StatisticStateItemWithCategory[],
		type: ChartInterval
	) {
		const rawDatasets = this.getRawDatasets(statistics, type)

		return rawDatasets.map(item => ({
			label: item.name,
			data: item.data,
			tension: 0.4,
			borderColor: item.colorHEX,
			backgroundColor: item.colorHEX,
			yAxisID: item.mode === 'number' ? 'yNumber' : 'yTime'
		}))
	}

	updateDatasetData(
		type: ChartInterval,
		record: {
			date: string
			count: number
			type: Mode
		},
		rawDataset: ChartDataset
	) {
		if (this.mode !== 'all') {
			if (this.mode === 'time' && record.type !== 'time') return
			if (this.mode === 'number' && record.type !== 'number') return
		}

		const recordCount =
			record.type === 'number' ? record.count : record.count * 1000

		switch (type) {
			case 'record': {
				const date = new Date(record.date).getTime()

				rawDataset.data.push({
					x: date,
					y: recordCount
				})

				return
			}

			case 'day': {
				const date = new Date(new Date(record.date).toDateString()).getTime()

				const findedRecordData = rawDataset.data.find(item => item.x === date)

				if (findedRecordData === undefined) {
					rawDataset.data.push({
						x: date,
						y: recordCount
					})
					return
				}

				findedRecordData.y += recordCount
				return
			}

			case 'week': {
				const weekNumberDate =
					moment()
						.day('Monday')
						.week(Number(moment(new Date(record.date)).format('W')))
						.unix() * 1000

				const findedRecordData = rawDataset.data.find(
					item => item.x === weekNumberDate
				)

				if (findedRecordData === undefined) {
					rawDataset.data.push({
						x: weekNumberDate,
						y: recordCount
					})
					return
				}

				findedRecordData.y += recordCount

				return
			}

			case 'month': {
				const weekNumberDate =
					moment()
						.startOf('month')
						.month(Number(moment(new Date(record.date)).format('M')) - 1)
						.unix() * 1000

				const findedRecordData = rawDataset.data.find(
					item => item.x === weekNumberDate
				)

				if (findedRecordData === undefined) {
					rawDataset.data.push({
						x: weekNumberDate,
						y: recordCount
					})
					return
				}

				findedRecordData.y += recordCount

				return
			}
		}
	}

	private initializeChart() {
		this.chart = new Chart('statistic-chart-canvas', {
			type: 'line',
			data: {
				datasets: this.getChartDatasets(this.statistics, this.interval)
			},
			options: CHART_OPTIONS
		})
	}

	private updateChartDatasets() {
		this.chart.data.datasets = this.getChartDatasets(
			this.statistics,
			this.interval
		)
	}

	private updateChartOptions() {
		if (this.chart.options.scales?.['yTime']) {
			this.chart.options.scales['yTime'].display =
				this.mode === 'all' || this.mode === 'time'
		}

		if (this.chart.options.scales?.['yNumber']) {
			this.chart.options.scales['yNumber'].display =
				this.mode === 'all' || this.mode === 'number'
		}
	}

	private getRawDatasets(
		statistics: StatisticStateItemWithCategory[],
		type: ChartInterval
	) {
		const rawDatasets: ChartDataset[] = []

		statistics.forEach(statisticRecord => {
			if (!statisticRecord.category) return

			if (this.by === 'group') {
				statisticRecord.category.group.forEach(groupId => {
					const group = this.categoryGroups[groupId]

					this.createRawDatasetAndUpdateRawDatasets(
						statisticRecord,
						type,
						rawDatasets,
						{
							id: this.categoryGroups[groupId]._id,
							name: group.name,
							colorHEX: group.color.colorHEX
						}
					)
				})

				return
			}

			this.createRawDatasetAndUpdateRawDatasets(
				statisticRecord,
				type,
				rawDatasets,
				{
					id: statisticRecord.category._id,
					name: statisticRecord.category.name,
					colorHEX: statisticRecord.category.color.colorHEX
				}
			)
		})

		return rawDatasets
	}

	private createRawDatasetAndUpdateRawDatasets(
		statisticRecord: StatisticStateItemWithCategory,
		type: ChartInterval,
		rawDatasets: ChartDataset[],
		options: {
			id: string
			name: string
			colorHEX: string
		}
	) {
		const rawDataset = this.findOrCreateRawDataset(
			{
				id: options.id,
				name: options.name,
				colorHEX: options.colorHEX,
				mode: statisticRecord.category.mode
			},
			rawDatasets
		)

		this.updateDatasetData(
			type,
			{
				date: statisticRecord.date,
				count: statisticRecord.count,
				type: statisticRecord.category.mode
			},
			rawDataset
		)
	}

	private findOrCreateRawDataset(
		data: {
			id: string
			name: string
			colorHEX: string
			mode: Mode
		},
		rawDatasets: ChartDataset[]
	) {
		const rawDataset = rawDatasets.find(item => item.id === data.id)

		if (rawDataset !== undefined) return rawDataset

		const index = rawDatasets.push({
			id: data.id,
			name: data.name,
			colorHEX: data.colorHEX,
			data: [],
			mode: data.mode
		})

		return rawDatasets[index - 1]
	}

	constructor(private store: Store<RootState>) {}
}
