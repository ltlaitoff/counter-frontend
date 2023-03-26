import { createReducer, on } from '@ngrx/store'
import * as StatisticSyncTypes from './statistic-sync.types'
import { StatisticSyncActions } from './statistic-sync.actions'

export const initialState: StatisticSyncTypes.SyncState = []

export const statisticReducer = createReducer(
	initialState,
	on(StatisticSyncActions.set, (state, { statistic }) => {
		return [...statistic]
	}),
	on(StatisticSyncActions.add, (state, { statistic }) => [...state, statistic]),
	on(StatisticSyncActions.delete, (state, category) => {
		return [...state.filter(item => item._id !== category._id)]
	})
)
