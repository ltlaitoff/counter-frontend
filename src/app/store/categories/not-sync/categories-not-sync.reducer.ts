import { createReducer, on } from '@ngrx/store'
import { NotSyncState } from '../categories.types'
import { CategoriesNotSyncActions } from './categories-not-sync.actions'

export const initialState: NotSyncState = []

export const categoriesNotSyncReducer = createReducer(
	initialState,

	on(CategoriesNotSyncActions.add, (state, payload) => {
		return [...state, payload]
	}),

	on(CategoriesNotSyncActions.changestatus, (state, { status, category }) => {
		return [
			...state.map(item => {
				if (item._id === category._id) {
					return {
						...item,
						status: status
					}
				}

				return item
			})
		]
	}),
	on(CategoriesNotSyncActions.delete, (state, payload) => {
		return [...state.filter(item => item._id !== payload._id)]
	})
)
