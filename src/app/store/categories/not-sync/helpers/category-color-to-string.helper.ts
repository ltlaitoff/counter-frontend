import { CategoriesTypes } from '../..'

export const categoryColorToString = (
	category: CategoriesTypes.NotSyncTypes.StateItemWithColor
): CategoriesTypes.NotSyncTypes.StateItem => {
	return { ...category, color: category.color._id }
}
