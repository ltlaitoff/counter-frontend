import { Color } from 'src/types/Color'
import {
	CategoryGroupsStateItem,
	CategoryGroupsStateItemWithColor
} from '../category-groups.types'

export function changeCategoryColorIdToColorObject(
	categories: CategoryGroupsStateItem[],
	colors: Color[]
): CategoryGroupsStateItemWithColor[] {
	if (colors.length === 0) return []

	return categories.map(item => {
		const color = colors.find(colorItem => colorItem._id === item.color)

		if (color === undefined) {
			throw new Error('Not found color id in colors')
		}

		return {
			...item,
			color: color
		}
	}) as CategoryGroupsStateItemWithColor[]
}
