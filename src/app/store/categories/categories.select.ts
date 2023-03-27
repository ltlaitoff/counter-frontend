import { RootState } from '../rootTypes'
import { CategoryStateItem } from './categories.types'
import { changeCategoryColorIdToColorObject } from './helpers'
import { CategoriesStatusTypes } from './status'

export const selectCategories = (state: RootState): CategoryStateItem[] => {
	return [
		...state.categories,
		...changeCategoryColorIdToColorObject(state.notSyncCategories, state.colors)
	]
}

export const selectCategoriesState = (
	state: RootState
): CategoriesStatusTypes.StatusState => {
	return state.categoriesStatus
}
