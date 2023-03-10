import { createReducer, on } from '@ngrx/store'
import { CategoriesNotSyncActions } from './categories-not-sync.actions'
import * as NotSyncTypes from './categories-not-sync.types'

export const initialState: NotSyncTypes.NotSyncState = []

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
