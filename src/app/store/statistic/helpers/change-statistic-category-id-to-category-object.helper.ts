import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import {
	StatisticItemToWithCategory,
	StatisticStateItem
} from '../statistic.types'

export function changeStatisticCategoryIdToCategoryObject<
	T extends StatisticStateItem,
	Y = StatisticItemToWithCategory<T>
>(data: StatisticStateItem[], categories: CategoryStateItemWithColor[]): Y[] {
	if (categories.length === 0) return []

	return data
		.map(item => {
			const category = categories.find(
				categoryItem => categoryItem._id === item.category
			)

			if (category === undefined) {
				return null
			}

			return {
				...item,
				category: category,
				date: new Date(item.date).toISOString()
			} as Y
		})
		.filter(item => item !== null) as Y[]
}
