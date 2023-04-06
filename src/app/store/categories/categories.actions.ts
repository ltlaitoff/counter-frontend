import { createActionGroup, props } from '@ngrx/store'
import { CategoriesBasicSet } from 'src/types/ApiInputs'
import {
	NotSyncStateItem,
	CategoryStateItemWithColor
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

		addEffect: (category: NotSyncStateItem) => category,
		deleteEffect: (category: NotSyncStateItem) => category,
		updateEffect: (category: NotSyncStateItem) => category
	}
})
