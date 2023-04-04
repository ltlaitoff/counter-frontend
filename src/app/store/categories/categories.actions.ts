import { createActionGroup, props } from '@ngrx/store'
import { CategoriesBasicSet } from 'src/types/ApiInputs'
import { CategoriesTypes } from '.'
import { NotSyncStateItem } from './categories.types'

export const CategoriesActions = createActionGroup({
	source: 'Categories',
	events: {
		load: (props: { force: boolean } = { force: false }) => props,

		add: (category: CategoriesBasicSet) => category,
		delete: (category: CategoriesTypes.CategoryStateItem) => category,
		update: props<{
			oldCategory: CategoriesTypes.CategoryStateItem

			dataForUpdate: CategoriesBasicSet
		}>(),

		addEffect: (category: NotSyncStateItem) => category,
		deleteEffect: (category: NotSyncStateItem) => category,
		updateEffect: (category: NotSyncStateItem) => category
	}
})
