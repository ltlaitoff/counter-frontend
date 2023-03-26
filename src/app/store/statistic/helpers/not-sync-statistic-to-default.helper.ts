import { Category } from 'src/types/Category'
import { StatisticTypes } from '..'

export const notSyncStatisticToDefault = (
	data: StatisticTypes.NotSyncTypes.StateItem[],
	categories: Category[]
): StatisticTypes.NotSyncTypes.StateItemWithDefaultStatistic[] => {
	if (categories.length === 0) return []

	return data.map(item => {
		const category = categories.find(
			categoryItem => categoryItem._id === item.category
		)

		if (category === undefined) {
			throw new Error('Not found category id in categories')
		}

		return {
			...item,
			category: category,
			date: new Date(item.date).toISOString()
		}
	})
}
