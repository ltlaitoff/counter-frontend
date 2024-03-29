import { ActionReducerMap } from '@ngrx/store'
import { RootState } from './rootTypes'

import { colorsReducer } from './colors'
import { categoriesReducer } from './categories/sync'
import { categoriesNotSyncReducer } from './categories/not-sync'
import { statisticReducer } from './statistic/sync'
import { statisticNotSyncReducer } from './statistic/not-sync'
import { categoriesStatusReducer } from './categories/status'
import { statisticStatusReducer } from './statistic/status'
import { categoryGroupsNotSyncReducer } from './category-groups/not-sync'
import { categoryGroupsSyncReducer } from './category-groups/sync'

const reducers: ActionReducerMap<RootState> = {
	colors: colorsReducer,
	categories: categoriesReducer,
	statistic: statisticReducer,
	notSyncCategories: categoriesNotSyncReducer,
	notSyncStatistic: statisticNotSyncReducer,
	categoriesStatus: categoriesStatusReducer,
	statisticStatus: statisticStatusReducer,
	notSyncCategoryGroups: categoryGroupsNotSyncReducer,
	syncCategoryGroups: categoryGroupsSyncReducer
}

export default reducers
