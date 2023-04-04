import { props, createActionGroup } from '@ngrx/store'
import { SyncState, SyncStateItem } from '../categories.types'

export const CategoriesSyncActions = createActionGroup({
	source: 'Categories sync',
	events: {
		set: props<{ categories: SyncState }>(),
		add: props<{ category: SyncStateItem }>(),
		delete: props<SyncStateItem>(),
		update: props<{ category: SyncStateItem }>()
	}
})
