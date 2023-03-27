import { RootState } from '../rootTypes'
import { StatisticStateItem } from './statistic.types'
import { notSyncStatisticToDefault } from './helpers'
import { StatisticStatusTypes } from './status'

export const selectStatistic = (state: RootState): StatisticStateItem[] => {
	return [
		...state.statistic,
		...notSyncStatisticToDefault(state.notSyncStatistic, state.categories)
	]
}

export const selectStatisticState = (
	state: RootState
): StatisticStatusTypes.StatusState => {
	return state.statisticStatus
}
