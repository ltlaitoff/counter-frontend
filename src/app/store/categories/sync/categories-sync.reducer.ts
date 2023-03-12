import { createReducer, on } from '@ngrx/store'
import * as CategoriesSyncTypes from './categories-sync.types'
import { CategoriesSyncActions } from './categories-sync.actions'

export const initialState: CategoriesSyncTypes.SyncState = []

export const categoriesReducer = createReducer(
	initialState,
	on(CategoriesSyncActions.set, (state, { categories }) => [...categories]),
	on(CategoriesSyncActions.add, (state, { category }) => [...state, category]),
	on(CategoriesSyncActions.delete, (state, category) => {
		return [...state.filter(item => item._id !== category._id)]
	})
)
