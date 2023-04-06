import { props, createActionGroup } from '@ngrx/store'
import { SyncState, SyncStateItem } from '../statistic.types'

export const StatisticSyncActions = createActionGroup({
	source: 'Statistic sync',
	events: {
		set: props<{ statistic: SyncState }>(),
		add: props<{ statistic: SyncStateItem }>(),
		delete: props<SyncStateItem>(),
		update: props<{ category: SyncStateItem }>()
	}
})
