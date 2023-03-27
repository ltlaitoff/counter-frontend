import { ColorState } from './colors'
import { StatisticTypes } from './statistic'
import { CategoriesTypes } from './categories'

export interface RootState {
	colors: ColorState
	categories: CategoriesTypes.SyncTypes.SyncState
	statistic: StatisticTypes.SyncTypes.SyncState
	notSyncCategories: CategoriesTypes.NotSyncTypes.NotSyncState
	notSyncStatistic: StatisticTypes.NotSyncTypes.NotSyncState
	categoriesStatus: CategoriesTypes.StatusTypes.StatusState
	statisticStatus: StatisticTypes.StatusTypes.StatusState
}
