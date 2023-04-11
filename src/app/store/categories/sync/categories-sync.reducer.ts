import { createReducer, on } from '@ngrx/store'
import { CategoriesSyncActions } from './categories-sync.actions'
import { SyncState } from '../categories.types'

export const initialState: SyncState = []

export const categoriesReducer = createReducer(
	initialState,
	on(CategoriesSyncActions.set, (state, { categories }) => [...categories]),
	on(CategoriesSyncActions.add, (state, { category }) => [...state, category]),
	on(CategoriesSyncActions.delete, (state, category) => {
		return [...state.filter(item => item._id !== category._id)]
	}),
	on(CategoriesSyncActions.orderupdate, (state, { data }) => {
		return [
			...state.map(item => {
				if (item._id === data.categoryId) {
					return {
						...item,
						order: data.currentIndex
					}
				}

				return item
			})
		]
	})
)
