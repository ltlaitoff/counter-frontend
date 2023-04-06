import { createActionGroup, props } from '@ngrx/store'
import { AddStatisticInputs } from 'src/types/ApiInputs'
import { NotSyncStatus } from '../../store.types'
import { NotSyncState, NotSyncStateItem } from '../statistic.types'

export const StatisticNotSyncActions = createActionGroup({
	source: 'Statistic not sync',
	events: {
		set: props<{ statistic: NotSyncState }>(),
		add: props<NotSyncStateItem>(),
		changeStatus: props<{
			status: NotSyncStatus
			statistic: NotSyncStateItem
		}>(),
		delete: props<NotSyncStateItem>(),
		update: props<{
			oldStatistic: NotSyncStateItem
			dataForUpdate: AddStatisticInputs
		}>()
	}
})
