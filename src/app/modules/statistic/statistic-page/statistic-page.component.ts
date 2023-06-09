import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectStatistic, StatisticActions } from 'src/app/store/statistic'
import { RootState } from 'src/app/store/rootTypes'
import { LoadStatus, NotSyncStatus } from 'src/app/store/store.types'
import { selectStatisticStatus } from 'src/app/store/statistic/statistic.select'
import { StatisticStateItemWithCategory } from 'src/app/store/statistic/statistic.types'
import { sortByDate } from '../helpers/sort-by-date.helper'
import {
	InitialControls,
	INITIAL_CONTROLS
} from '../statistic-controls/statistic-controls.config'

@Component({
	selector: 'counter-statistic-page',
	templateUrl: './statistic-page.component.html',
	styleUrls: ['./statistic-page.component.scss']
})
export class StatisticComponent implements OnInit {
	statistics: StatisticStateItemWithCategory[] | null = null
	filteredStatistic: StatisticStateItemWithCategory[] | null = null
	currentStatus: LoadStatus | null = null
	editStatisticRecordId: string | null = null

	formData: InitialControls = structuredClone(INITIAL_CONTROLS)

	formDataChange(value: any) {
		if (this.statistics === null) return

		this.filteredStatistic = this.updateFilteredStatistic(
			this.statistics,
			value
		)
	}

	ngOnInit() {
		this.store.select(selectStatistic).subscribe(newStatistic => {
			this.statistics = newStatistic.sort(sortByDate)
			this.filteredStatistic = this.updateFilteredStatistic(
				newStatistic,
				this.formData
			)
		})

		this.store.select(selectStatisticStatus).subscribe(value => {
			this.currentStatus = value
		})
	}

	constructor(private store: Store<RootState>) {}

	reloadStatistic(force: boolean) {
		this.store.dispatch(StatisticActions.load({ force: force }))
	}

	checkStatusIs(
		status: NotSyncStatus | undefined,
		value: 'not-synchronized' | 'synchronization' | 'error'
	) {
		if (!status) return

		switch (value) {
			case 'not-synchronized':
				return status === NotSyncStatus.NOT_SYNCHRONIZED

			case 'synchronization':
				return status === NotSyncStatus.SYNCHRONIZATION

			case 'error':
				return status === NotSyncStatus.ERROR
		}
	}

	deleteStatisticRecord(statisticRecord: StatisticStateItemWithCategory) {
		this.store.dispatch(StatisticActions.delete(statisticRecord))
	}

	closeStatisticEdit() {
		this.editStatisticRecordId = null
	}

	editStastisitcStatus(category: StatisticStateItemWithCategory) {
		if (this.editStatisticRecordId === null) {
			this.editStatisticRecordId = category._id
			return
		}

		this.editStatisticRecordId = null
	}

	editStastistic(
		currentValue: StatisticStateItemWithCategory,
		editedValue: any
	) {
		this.editStatisticRecordId = null

		this.store.dispatch(
			StatisticActions.update({
				oldStatistic: currentValue,
				dataForUpdate: editedValue
			})
		)
	}

	private updateFilteredStatistic(
		statistics: StatisticStateItemWithCategory[],
		formData: InitialControls
	): StatisticStateItemWithCategory[] {
		const afterComments = this.updateFilteredStatisticComments(
			statistics,
			formData.comment
		)

		const afterMode = this.updateFilteredStatisticMode(
			afterComments,
			formData.mode
		)

		const afterDate = this.updateFilteredStatisticDate(afterMode, formData.date)
		const afterCategories = this.updateFilteredStatisticCategory(
			afterDate,
			formData.categories
		)

		return afterCategories
	}

	private updateFilteredStatisticComments(
		statistics: StatisticStateItemWithCategory[],
		comment: InitialControls['comment']
	) {
		if (comment === 'all') return statistics

		const filteredComments = statistics.filter(item => {
			return comment === 'with'
				? item.comment.length > 0
				: item.comment.length === 0
		})

		return filteredComments
	}

	private updateFilteredStatisticMode(
		statistics: StatisticStateItemWithCategory[],
		mode: InitialControls['mode']
	) {
		if (mode === 'all') return statistics

		return statistics.filter(item => mode === item.category.mode)
	}

	private updateFilteredStatisticDate(
		statistics: StatisticStateItemWithCategory[],
		mode: InitialControls['date']
	) {
		if (mode === 'all') {
			return statistics
		}

		const topDate = new Date(Date.now())
		const lowerDate = new Date(Date.now())

		topDate.setHours(0)
		topDate.setMinutes(0)
		topDate.setSeconds(0)

		lowerDate.setHours(0)
		lowerDate.setMinutes(0)
		lowerDate.setSeconds(0)

		let topDateDelay = 0
		let lowerDateDelay = 365

		if (mode === 'week') lowerDateDelay = 6
		if (mode === 'month') lowerDateDelay = 31
		if (mode === 'prev-month') {
			topDateDelay = 31
			lowerDateDelay = 61
		}
		if (mode === 'year') lowerDateDelay = 364

		topDate.setDate(topDate.getDate() - topDateDelay)
		lowerDate.setDate(lowerDate.getDate() - lowerDateDelay)

		return statistics.filter(item => {
			const date = new Date(item.date)

			return (
				date.getTime() > lowerDate.getTime() &&
				date.getTime() < topDate.getTime()
			)
		})
	}

	private updateFilteredStatisticCategory(
		statistics: StatisticStateItemWithCategory[],
		categories: InitialControls['categories']
	) {
		if (categories.length === 0) {
			return statistics
		}

		return statistics.filter(item => {
			return categories.includes(item.category._id)
		})
	}
}
