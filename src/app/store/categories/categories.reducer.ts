import { createReducer, on } from '@ngrx/store'
import { CategoriesState } from '.'
import { deleteCategorySuccess } from './categories.actions'
import {
	addCategorySuccess,
	categoriesLoadedSuccess
} from './categories.actions'

export const initialState: CategoriesState = []

export const categoriesReducer = createReducer(
	initialState,
	on(categoriesLoadedSuccess, (state, { payload }) => [...payload]),
	on(addCategorySuccess, (state, category) => [...state, category]),
	on(deleteCategorySuccess, (state, { id }) => {
		return [...state.filter(item => item._id !== id)]
	})
)
