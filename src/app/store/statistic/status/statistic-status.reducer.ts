import { createReducer, on } from '@ngrx/store'
import { StatisticStatusActions } from './statistic-status.actions'
import { StatisticStatusTypes } from '.'

export const initialState: StatisticStatusTypes.StatusState =
	StatisticStatusTypes.StatusState
		.NOT_SYNCHRONIZED as StatisticStatusTypes.StatusState

export const statisticStatusReducer = createReducer(
	initialState,

	on(StatisticStatusActions.set, (state, payload) => {
		return payload.status
	})
)
