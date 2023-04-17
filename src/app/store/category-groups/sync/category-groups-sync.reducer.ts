import { createReducer, on } from '@ngrx/store'
import { CategoryGroupsSyncActions } from './category-groups-sync.actions'
import { CategoryGroupsSyncState } from '../category-groups.types'

export const initialState: CategoryGroupsSyncState = []

export const categoryGroupsSyncReducer = createReducer(
	initialState,

	on(CategoryGroupsSyncActions.set, (state, { payload }) => [...payload]),

	on(CategoryGroupsSyncActions.add, (state, { payload }) => [
		...state,
		payload
	]),

	on(CategoryGroupsSyncActions.delete, (state, payload) => {
		return [...state.filter(item => item._id !== payload._id)]
	}),

	on(CategoryGroupsSyncActions.orderupdate, (state, { payload }) => {
		return [
			...state.map(item => {
				if (item._id === payload.categoryId) {
					return {
						...item,
						order: payload.currentIndex
					}
				}

				return item
			})
		]
	})
)
