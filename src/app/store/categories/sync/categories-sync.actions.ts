import { props, createActionGroup } from '@ngrx/store'
import { ReorderCategoryData } from 'src/types/ApiInputs'
import { SyncState, SyncStateItem } from '../categories.types'

export const CategoriesSyncActions = createActionGroup({
	source: 'Categories sync',
	events: {
		set: props<{ categories: SyncState }>(),
		add: props<{ category: SyncStateItem }>(),
		delete: props<SyncStateItem>(),
		update: props<{ category: SyncStateItem }>(),
		orderUpdate: props<{ data: ReorderCategoryData }>()
	}
})
