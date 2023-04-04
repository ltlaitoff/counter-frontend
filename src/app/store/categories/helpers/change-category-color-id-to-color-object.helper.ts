import { Color } from 'src/types/Color'
import {
	CategoryStateItem,
	CategoryStateItemWithColor
} from '../categories.types'

export function changeCategoryColorIdToColorObject(
	categories: CategoryStateItem[],
	colors: Color[]
): CategoryStateItemWithColor[] {
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
	}) as CategoryStateItemWithColor[]
}
