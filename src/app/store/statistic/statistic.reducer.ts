import { createReducer, on } from '@ngrx/store'

import * as StatisticActions from './statistic.actions'

import { StatisticState } from '.'

export const initialState: StatisticState = []

export const statisticReducer = createReducer(
	initialState,
	on(StatisticActions.loadStatisticSuccess, (state, { payload }) => [
		...payload
	]),
	on(StatisticActions.addStatisticSuccess, (state, statistic) => [
		...state,
		statistic
	]),
	on(StatisticActions.deleteStatisticSuccess, (state, statistic) => {
		if (!statistic._id) {
			return state
		}

		return [...state.filter(item => item._id !== statistic._id)]
	})
)
