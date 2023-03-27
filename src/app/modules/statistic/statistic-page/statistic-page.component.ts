import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectStatistic, StatisticActions } from 'src/app/store/statistic'
import { Statistic } from 'src/types/Statistic'
import { RootState } from 'src/app/store/rootTypes'

@Component({
	selector: 'counter-statistic-page',
	templateUrl: './statistic-page.component.html',
	styleUrls: ['./statistic-page.component.scss']
})
export class StatisticComponent implements OnInit {
	statistics: Statistic[] | null = null

	ngOnInit() {
		this.store.select(selectStatistic).subscribe(newStatistic => {
			this.statistics = newStatistic
		})
	}

	constructor(private store: Store<RootState>) {}

	deleteStatisticRecord(statisticRecord: Statistic) {
		this.store.dispatch(StatisticActions.delete(statisticRecord))
	}
}
