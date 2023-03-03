import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectStatistic, StatisticActions } from 'src/app/store/statistic'
import { Statistic } from 'src/types/Statistic'
import { ApiService } from '../../services/api.service'
import { RootState } from '../../store/rootTypes'

@Component({
	selector: 'app-statistic',
	templateUrl: './statistic.component.html',
	styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
	statistics: Statistic[] | null = null

	ngOnInit() {
		this.store.dispatch(StatisticActions.loadStatistic())

		this.store.select(selectStatistic).subscribe(newStatistic => {
			this.statistics = newStatistic
		})
	}

	constructor(private store: Store<RootState>) {}
}
