import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
	ChartDataBy,
	ChartDataCategoryMode,
	ChartDataInterval
} from '../statistic-chart/statistic-chart.types'

@Component({
	selector: 'counter-statistic-chart-options',
	templateUrl: './statistic-chart-options.component.html'
})
export class StatisticChartOptionsComponent {
	@Input({ required: true }) interval!: ChartDataInterval
	@Input({ required: true }) by!: ChartDataBy
	@Input({ required: true }) categoryMode!: ChartDataCategoryMode

	@Output() intervalChange = new EventEmitter<ChartDataInterval>()
	@Output() byChange = new EventEmitter<ChartDataBy>()
	@Output() categoryModeChange = new EventEmitter<ChartDataCategoryMode>()
	@Output() update = new EventEmitter()

	toggleInterval() {
		this.updateInterval()
		this.update.emit()
	}

	toggleBy() {
		this.updateBy()
		this.update.emit()
	}

	toggleCategoryMode() {
		this.updateCategoryMode()
		this.update.emit()
	}

	private updateInterval() {
		if (this.interval === 'day') {
			this.intervalChange.emit('record')
			return
		}

		this.intervalChange.emit('day')
	}

	private updateBy() {
		if (this.by === 'category') {
			this.byChange.emit('group')
			return
		}

		this.byChange.emit('category')
	}

	private updateCategoryMode() {
		if (this.categoryMode === 'time') {
			this.categoryModeChange.emit('number')
			return
		}

		if (this.categoryMode === 'number') {
			this.categoryModeChange.emit('all')
			return
		}

		if (this.categoryMode === 'all') {
			this.categoryModeChange.emit('time')
			return
		}
	}
}
