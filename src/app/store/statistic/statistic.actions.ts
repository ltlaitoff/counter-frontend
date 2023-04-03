import { createActionGroup, props } from '@ngrx/store'
import { AddStatisticInputs } from 'src/types/ApiInputs'
import { NotSyncTypes } from './not-sync'
import { StatisticTypes } from '.'

export const StatisticActions = createActionGroup({
	source: 'Stastistic',
	events: {
		load: (props: { force: boolean } = { force: false }) => props,

		add: (statistic: AddStatisticInputs) => statistic,
		delete: (statistic: StatisticTypes.StatisticStateItem) => statistic,
		update: props<{
			oldStatistic: StatisticTypes.StatisticStateItem

			dataForUpdate: AddStatisticInputs
		}>(),

		addEffect: (statistic: NotSyncTypes.StateItem) => statistic,
		deleteEffect: (statistic: NotSyncTypes.StateItem) => statistic,
		updateEffect: (statistic: NotSyncTypes.StateItem) => statistic
	}
})
