import { RootState } from '../rootTypes'
import { CategoryStateItem } from './categories.types'
import { changeCategoryColorIdToColorObject } from './helpers'

export const selectCategories = (state: RootState): CategoryStateItem[] => {
	return [
		...state.categories,
		...changeCategoryColorIdToColorObject(state.notSyncCategories, state.colors)
	]
}
