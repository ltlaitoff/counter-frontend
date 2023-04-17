import { ColorState } from './colors'
import { StatisticTypes } from './statistic'
import { CategoriesTypes } from './categories'
import { CategoryGroupsTypes } from './category-groups'

export interface RootState {
	colors: ColorState
	categories: CategoriesTypes.SyncState
	statistic: StatisticTypes.SyncState
	notSyncCategories: CategoriesTypes.NotSyncState
	notSyncStatistic: StatisticTypes.NotSyncState
	categoriesStatus: CategoriesTypes.StatusTypes.StatusState
	statisticStatus: StatisticTypes.StatusTypes.StatusState
	notSyncCategoryGroups: CategoryGroupsTypes.CategoryGroupsNotSyncState
	syncCategoryGroups: CategoryGroupsTypes.CategoryGroupsSyncState
}
