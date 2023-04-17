import { createActionGroup, props } from '@ngrx/store'

import { AddCategoryGroupInputs } from 'src/types/ApiInputs'
import {
	CategoryGroupsNotSyncStateItem,
	CategoryGroupsStateItem,
	CategoryGroupsSyncStateItem
} from './category-groups.types'

export const CategoryGroupsActions = createActionGroup({
	source: 'CategoryGroups',
	events: {
		load: (props: { force: boolean } = { force: false }) => props,

		add: (props: AddCategoryGroupInputs) => props,
		delete: (props: CategoryGroupsStateItem) => props,
		update: props<{
			old: CategoryGroupsStateItem
			dataForUpdate: AddCategoryGroupInputs
		}>(),
		reorder: props<{
			props: CategoryGroupsSyncStateItem
			previousIndex: number
			currentIndex: number
		}>(),

		addEffect: (props: CategoryGroupsNotSyncStateItem) => props,
		deleteEffect: (props: CategoryGroupsNotSyncStateItem) => props,
		updateEffect: (props: CategoryGroupsNotSyncStateItem) => props,
		reorderEffect: props<{
			props: CategoryGroupsNotSyncStateItem
			previousIndex: number
			currentIndex: number
		}>()
	}
})
