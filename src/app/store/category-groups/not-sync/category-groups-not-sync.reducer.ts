import { createReducer, on } from '@ngrx/store'
import { CategoryGroupsNotSyncState } from '../category-groups.types'
import { CategoryGroupsNotSyncActions } from './category-groups-not-sync.actions'

export const initialState: CategoryGroupsNotSyncState = []

export const categoryGroupsNotSyncReducer = createReducer(
	initialState,

	on(CategoryGroupsNotSyncActions.add, (state, payload) => {
		return [...state, payload]
	}),

	on(
		CategoryGroupsNotSyncActions.changestatus,
		(state, { status, payload }) => {
			return [
				...state.map(item => {
					if (item._id === payload._id) {
						return {
							...item,
							status: status
						}
					}

					return item
				})
			]
		}
	),

	on(CategoryGroupsNotSyncActions.delete, (state, payload) => {
		return [...state.filter(item => item._id !== payload._id)]
	})
)
