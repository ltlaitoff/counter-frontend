import { createReducer, on } from '@ngrx/store'
import { CategoriesStatusActions } from './categories-status.actions'
import { CategoriesStatusTypes } from '.'

export const initialState: CategoriesStatusTypes.StatusState =
	CategoriesStatusTypes.StatusState
		.NOT_SYNCHRONIZED as CategoriesStatusTypes.StatusState

export const categoriesStatusReducer = createReducer(
	initialState,

	on(CategoriesStatusActions.set, (state, payload) => {
		return payload.status
	})
)
