import { createReducer, on } from '@ngrx/store'
import { StatisticSyncActions } from './statistic-sync.actions'
import { SyncState } from '../statistic.types'

export const initialState: SyncState = []

export const statisticReducer = createReducer(
	initialState,
	on(StatisticSyncActions.set, (state, { statistic }) => {
		return [...statistic]
	}),
	on(StatisticSyncActions.add, (state, { statistic }) => [...state, statistic]),
	on(StatisticSyncActions.delete, (state, statistic) => {
		return [...state.filter(item => item._id !== statistic._id)]
	})
)
