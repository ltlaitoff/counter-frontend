import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectStatistic, StatisticActions } from 'src/app/store/statistic'
import { Statistic } from 'src/types/Statistic'
import { RootState } from 'src/app/store/rootTypes'
import { LoadStatus } from '../../../store/store.types'
import { selectStatisticState } from 'src/app/store/statistic/statistic.select'

@Component({
	selector: 'counter-statistic-page',
	templateUrl: './statistic-page.component.html',
	styleUrls: ['./statistic-page.component.scss']
})
export class StatisticComponent implements OnInit {
	statistics: Statistic[] | null = null
	currentStatus: LoadStatus | null = null

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

	deleteStatisticRecord(statisticRecord: Statistic) {
		this.store.dispatch(StatisticActions.delete(statisticRecord))
	}
}
