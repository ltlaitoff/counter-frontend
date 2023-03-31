import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectStatistic, StatisticActions } from 'src/app/store/statistic'
import { RootState } from 'src/app/store/rootTypes'
import { LoadStatus } from 'src/app/store/store.types'
import { selectStatisticState } from 'src/app/store/statistic/statistic.select'
import { StatisticStateItem } from 'src/app/store/statistic/statistic.types'
import { Status } from 'src/app/store/statistic/not-sync/statistic-not-sync.types'

@Component({
	selector: 'counter-statistic-page',
	templateUrl: './statistic-page.component.html',
	styleUrls: ['./statistic-page.component.scss']
})
export class StatisticComponent implements OnInit {
	statistics: StatisticStateItem[] | null = null
	currentStatus: LoadStatus | null = null
	editStatisticRecordId: string | null = null

	ngOnInit() {
		this.store.select(selectStatistic).subscribe(newStatistic => {
			this.statistics = newStatistic
		})

		this.store.select(selectStatisticState).subscribe(value => {
			this.currentStatus = value
		})
	}

	constructor(private store: Store<RootState>) {}

	reloadStatistic(force: boolean) {
		this.store.dispatch(StatisticActions.load({ force: force }))
	}

	checkStatusIs(
		status: Status | undefined,
		value: 'not-synchronized' | 'synchronization' | 'error'
	) {
		if (!status) return

		switch (value) {
			case 'not-synchronized':
				return status === Status.NOT_SYNCHRONIZED

			case 'synchronization':
				return status === Status.SYNCHRONIZATION

			case 'error':
				return status === Status.ERROR
		}
	}

	deleteStatisticRecord(statisticRecord: StatisticStateItem) {
		this.store.dispatch(StatisticActions.delete(statisticRecord))
	}

	closeStatisticEdit() {
		this.editStatisticRecordId = null
	}

	editStastisitcStatus(category: StatisticStateItem) {
		if (this.editStatisticRecordId === null) {
			this.editStatisticRecordId = category._id
			return
		}

		this.editStatisticRecordId = null
	}

	editStastistic(currentValue: StatisticStateItem, editedValue: any) {
		this.editStatisticRecordId = null

		this.store.dispatch(
			StatisticActions.update({
				oldStatistic: currentValue,
				dataForUpdate: editedValue
			})
		)
	}
}
