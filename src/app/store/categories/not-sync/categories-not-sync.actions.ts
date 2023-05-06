import { createActionGroup, props } from '@ngrx/store'
import { CategoriesBasicSet } from 'src/types/ApiInputs'
import { NotSyncStatus } from '../../store.types'
import { NotSyncState, NotSyncStateItem } from '../categories.types'

export const CategoriesNotSyncActions = createActionGroup({
	source: 'Categories not sync',
	events: {
		set: props<{ categories: NotSyncState }>(),
		add: props<NotSyncStateItem>(),
		changeStatus: props<{
			status: NotSyncStatus
			category: NotSyncStateItem
		}>(),
		delete: props<NotSyncStateItem>(),
		update: props<{
			oldCategory: NotSyncStateItem
			dataForUpdate: CategoriesBasicSet
		}>()
	}
})
