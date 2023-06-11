import { ResolveFn } from '@angular/router'
import { inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { RootState } from '../store/rootTypes'
import { StatisticActions } from '../store/statistic'

export const statisticResolver: ResolveFn<boolean> = (route, state) => {
	const store = inject(Store<RootState>)

	store.dispatch(StatisticActions.load())

	return true
}
