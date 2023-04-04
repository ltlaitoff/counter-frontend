import { RootState } from '../rootTypes'
import { CategoryStateItemWithColor } from './categories.types'
import { changeCategoryColorIdToColorObject } from './helpers'
import { CategoriesStatusTypes } from './status'

export const selectCategories = (
	state: RootState
): CategoryStateItemWithColor[] => {
	return changeCategoryColorIdToColorObject(
		[...state.categories, ...state.notSyncCategories],
		state.colors
	)
}

export const selectCategoriesState = (
	state: RootState
): CategoriesStatusTypes.StatusState => {
	return state.categoriesStatus
}
