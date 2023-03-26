import { createActionGroup, props } from '@ngrx/store'
import * as NotSyncTypes from './statistic-not-sync.types'

export const StatisticNotSyncActions = createActionGroup({
	source: 'Statistic not sync',
	events: {
		set: props<{ statistic: NotSyncTypes.NotSyncState }>(),
		add: props<NotSyncTypes.StateItem>(),
		changeStatus: props<{
			status: NotSyncTypes.Status
			statistic: NotSyncTypes.StateItem
		}>(),
		delete: props<NotSyncTypes.StateItem>()

		// TODO: Create change
	}
})
