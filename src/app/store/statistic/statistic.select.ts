import { RootState } from '../rootTypes'
import { StatisticStateItem } from './statistic.types'
import { notSyncStatisticToDefault } from './helpers'

export const selectStatistic = (state: RootState): StatisticStateItem[] => {
	return [
		...state.statistic,
		...notSyncStatisticToDefault(state.notSyncStatistic, state.categories)
	]
}
