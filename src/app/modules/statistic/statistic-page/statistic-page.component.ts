import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectStatistic, StatisticActions } from 'src/app/store/statistic'
import { RootState } from 'src/app/store/rootTypes'
import { LoadStatus, NotSyncStatus } from 'src/app/store/store.types'
import { selectStatisticStatus } from 'src/app/store/statistic/statistic.select'
import { StatisticStateItemWithCategory } from 'src/app/store/statistic/statistic.types'
import { sortByDate } from '../helpers/sort-by-date.helper'

@Component({
	selector: 'counter-statistic-page',
	templateUrl: './statistic-page.component.html',
	styleUrls: ['./statistic-page.component.scss']
})
export class StatisticComponent implements OnInit {
	statistics: StatisticStateItemWithCategory[] | null = null
	currentStatus: LoadStatus | null = null
	editStatisticRecordId: string | null = null

	ngOnInit() {
		this.store.select(selectStatistic).subscribe(newStatistic => {
			this.statistics = newStatistic.sort(sortByDate)
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
}
