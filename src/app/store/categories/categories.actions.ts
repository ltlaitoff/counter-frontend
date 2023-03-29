import { createActionGroup, props } from '@ngrx/store'
import { CategoriesBasicSet } from 'src/types/ApiInputs'
import { NotSyncTypes } from './not-sync'
import { CategoriesTypes } from '.'

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

		addEffect: (category: NotSyncTypes.StateItem) => category,
		deleteEffect: (category: NotSyncTypes.StateItem) => category,
		updateEffect: (category: NotSyncTypes.StateItem) => category
	}
})
