import { createActionGroup, props } from '@ngrx/store'
import { CategoriesStatusTypes } from '.'

export const CategoriesStatusActions = createActionGroup({
	source: 'Categories status',
	events: {
		set: props<{ status: CategoriesStatusTypes.StatusState }>()
	}
})
