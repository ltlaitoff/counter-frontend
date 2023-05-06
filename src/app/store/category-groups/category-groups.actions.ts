import { createActionGroup, props } from '@ngrx/store'

import { AddCategoryGroupInputs } from 'src/types/ApiInputs'
import {
	CategoryGroupsNotSyncStateItem,
	CategoryGroupsStateItem,
	CategoryGroupsStateItemWithColor,
	CategoryGroupsSyncStateItem,
	CategoryGroupsSyncStateItemWithColor
} from './category-groups.types'

export const CategoryGroupsActions = createActionGroup({
	source: 'CategoryGroups',
	events: {
		load: (props: { force: boolean } = { force: false }) => props,

		add: (props: AddCategoryGroupInputs) => props,
		delete: (props: CategoryGroupsStateItemWithColor) => props,
		update: props<{
			old: CategoryGroupsStateItemWithColor
			dataForUpdate: AddCategoryGroupInputs
		}>(),
		reorder: props<{
			props: CategoryGroupsSyncStateItemWithColor
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
