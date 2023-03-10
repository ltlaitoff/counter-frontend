import { ColorState } from './colors'
import { StatisticState } from './statistic'
import { CategoriesTypes } from './categories'

export interface RootState {
	colors: ColorState
	categories: CategoriesTypes.SyncTypes.SyncState
	statistic: StatisticState
	notSyncCategories: CategoriesTypes.NotSyncTypes.NotSyncState
}
