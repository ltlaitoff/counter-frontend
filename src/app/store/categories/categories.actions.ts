import { createActionGroup, props } from '@ngrx/store'
import { AddCategoryInputs } from 'src/types/ApiInputs'
import { NotSyncTypes } from './not-sync'
import { CategoriesTypes } from '.'

export const CategoriesActions = createActionGroup({
	source: 'Categories',
	events: {
		load: (props: { force: boolean } = { force: false }) => props,

		add: (category: AddCategoryInputs) => category,
		delete: (
			category:
				| CategoriesTypes.NotSyncTypes.StateItemWithColor
				| CategoriesTypes.SyncTypes.StateItem
		) => category,

		addEffect: (category: NotSyncTypes.StateItem) => category,
		deleteEffect: (category: NotSyncTypes.StateItem) => category
	}
})
