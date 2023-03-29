import { createActionGroup, props } from '@ngrx/store'
import { CategoriesBasicSet } from 'src/types/ApiInputs'
import * as NotSyncTypes from './categories-not-sync.types'

export const CategoriesNotSyncActions = createActionGroup({
	source: 'Categories not sync',
	events: {
		set: props<{ categories: NotSyncTypes.NotSyncState }>(),
		add: props<NotSyncTypes.StateItem>(),
		changeStatus: props<{
			status: NotSyncTypes.Status
			category: NotSyncTypes.StateItem
		}>(),
		delete: props<NotSyncTypes.StateItem>(),
		update: props<{
			oldCategory: NotSyncTypes.StateItem
			dataForUpdate: CategoriesBasicSet
		}>()
	}
})
