import { ColorState } from './colors'
import { StatisticTypes } from './statistic'
import { CategoriesTypes } from './categories'

export interface RootState {
	colors: ColorState
	categories: CategoriesTypes.SyncState
	statistic: StatisticTypes.SyncState
	notSyncCategories: CategoriesTypes.NotSyncState
	notSyncStatistic: StatisticTypes.NotSyncState
	categoriesStatus: CategoriesTypes.StatusTypes.StatusState
	statisticStatus: StatisticTypes.StatusTypes.StatusState
}
