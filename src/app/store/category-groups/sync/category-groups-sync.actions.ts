import { props, createActionGroup } from '@ngrx/store'
import { ReorderCategoryData } from 'src/types/ApiInputs'
import {
	CategoryGroupsSyncState,
	CategoryGroupsSyncStateItem
} from '../category-groups.types'

export const CategoryGroupsSyncActions = createActionGroup({
	source: 'CategoryGroupsSync',
	events: {
		set: props<{ payload: CategoryGroupsSyncState }>(),
		add: props<{ payload: CategoryGroupsSyncStateItem }>(),
		delete: props<CategoryGroupsSyncStateItem>(),
		update: props<{ payload: CategoryGroupsSyncStateItem }>(),
		orderUpdate: props<{ payload: ReorderCategoryData }>()
	}
})
