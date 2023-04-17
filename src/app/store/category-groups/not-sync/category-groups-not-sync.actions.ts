import { createActionGroup, props } from '@ngrx/store'

import { AddCategoryGroupInputs } from 'src/types/ApiInputs'
import { NotSyncStatus } from 'src/app/store/store.types'

import {
	CategoryGroupsNotSyncState,
	CategoryGroupsNotSyncStateItem
} from '../category-groups.types'

export const CategoryGroupsNotSyncActions = createActionGroup({
	source: 'CategoryGroupsNotSync',
	events: {
		set: props<{ categories: CategoryGroupsNotSyncState }>(),
		add: props<CategoryGroupsNotSyncStateItem>(),
		changeStatus: props<{
			status: NotSyncStatus
			payload: CategoryGroupsNotSyncStateItem
		}>(),
		delete: props<CategoryGroupsNotSyncStateItem>(),
		update: props<{
			oldCategory: CategoryGroupsNotSyncStateItem
			dataForUpdate: AddCategoryGroupInputs
		}>()
	}
})
