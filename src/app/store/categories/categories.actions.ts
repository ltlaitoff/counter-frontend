import { createActionGroup, props } from '@ngrx/store'
import { CategoriesBasicSet } from 'src/types/ApiInputs'
import {
	NotSyncStateItem,
	CategoryStateItemWithColor,
	CategorySyncStateItemWithColor
} from './categories.types'

export const CategoriesActions = createActionGroup({
	source: 'Categories',
	events: {
		load: (props: { force: boolean } = { force: false }) => props,

		add: (category: CategoriesBasicSet) => category,
		delete: (category: CategoryStateItemWithColor) => category,
		update: props<{
			oldCategory: CategoryStateItemWithColor

			dataForUpdate: CategoriesBasicSet
		}>(),
		reorder: props<{
			category: CategorySyncStateItemWithColor
			previousIndex: number
			currentIndex: number
		}>(),

		addEffect: (category: NotSyncStateItem) => category,
		deleteEffect: (category: NotSyncStateItem) => category,
		updateEffect: (category: NotSyncStateItem) => category,
		reorderEffect: props<{
			category: NotSyncStateItem
			previousIndex: number
			currentIndex: number
		}>()
	}
})
