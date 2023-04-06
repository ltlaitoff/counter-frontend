import { createActionGroup, props } from '@ngrx/store'
import { AddStatisticInputs } from 'src/types/ApiInputs'
import { NotSyncStateItem } from './statistic.types'
import { StatisticStateItemWithCategory } from './statistic.types'

export const StatisticActions = createActionGroup({
	source: 'Stastistic',
	events: {
		load: (props: { force: boolean } = { force: false }) => props,

		add: (statistic: AddStatisticInputs) => statistic,
		delete: (statistic: StatisticStateItemWithCategory) => statistic,
		update: props<{
			oldStatistic: StatisticStateItemWithCategory

			dataForUpdate: AddStatisticInputs
		}>(),

		addEffect: (statistic: NotSyncStateItem) => statistic,
		deleteEffect: (statistic: NotSyncStateItem) => statistic,
		updateEffect: (statistic: NotSyncStateItem) => statistic
	}
})
