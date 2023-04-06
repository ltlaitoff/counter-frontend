import { createReducer, on } from '@ngrx/store'
import { NotSyncState } from '../statistic.types'
import { StatisticNotSyncActions } from './statistic-not-sync.actions'

export const initialState: NotSyncState = []

export const statisticNotSyncReducer = createReducer(
	initialState,

	on(StatisticNotSyncActions.add, (state, payload) => {
		return [...state, payload]
	}),

	on(StatisticNotSyncActions.changestatus, (state, { status, statistic }) => {
		return [
			...state.map(item => {
				if (item._id === statistic._id) {
					return {
						...item,
						status: status
					}
				}

				return item
			})
		]
	}),
	on(StatisticNotSyncActions.delete, (state, payload) => {
		return [...state.filter(item => item._id !== payload._id)]
	})
)
