import { Color } from 'src/types/Color'
import { NotSyncTypes } from '../categories.types'

export const changeCategoryColorIdToColorObject = (
	categories: NotSyncTypes.StateItem[],
	colors: Color[]
): NotSyncTypes.StateItemWithColor[] => {
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
	})
}
