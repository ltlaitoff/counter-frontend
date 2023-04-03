import { props, createActionGroup } from '@ngrx/store'
import * as SyncTypes from './statistic-sync.types'

export const StatisticSyncActions = createActionGroup({
	source: 'Statistic sync',
	events: {
		set: props<{ statistic: SyncTypes.SyncState }>(),
		add: props<{ statistic: SyncTypes.StateItem }>(),
		delete: props<SyncTypes.StateItem>(),
		update: props<{ category: SyncTypes.StateItem }>()
	}
})
