import { RootState } from '../rootTypes'
import { CategoryGroupsStateItemWithColor } from './category-groups.types'
import { changeCategoryColorIdToColorObject } from './helpers'

export const selectCategoryGroups = (
	state: RootState
): CategoryGroupsStateItemWithColor[] => {
	return changeCategoryColorIdToColorObject(
		[...state.syncCategoryGroups, ...state.notSyncCategoryGroups],
		state.colors
	)
}
