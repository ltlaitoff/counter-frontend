import {
	StatisticStateItemWithCategory,
	StatisticStateItem
} from '../statistic.types'

export function statisticStateItemWithCategoryToDefault(
	state: StatisticStateItemWithCategory
): StatisticStateItem {
	return { ...state, category: state.category._id }
}
