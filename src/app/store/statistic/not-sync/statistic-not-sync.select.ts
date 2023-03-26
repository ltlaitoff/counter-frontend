import { RootState } from '../../rootTypes'
import { notSyncStatisticToDefault } from '../helpers'
import { NotSyncTypes } from '.'

export const selectNotSyncStatistic = (
	state: RootState
): NotSyncTypes.StateItemWithDefaultStatistic[] => {
	return [
		...notSyncStatisticToDefault(state.notSyncStatistic, state.categories)
	]
}
