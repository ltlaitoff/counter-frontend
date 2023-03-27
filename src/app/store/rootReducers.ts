import { ActionReducerMap } from '@ngrx/store'
import { RootState } from './rootTypes'

import { colorsReducer } from './colors'
import { categoriesReducer } from './categories/sync'
import { categoriesNotSyncReducer } from './categories/not-sync'
import { statisticReducer } from './statistic/sync'
import { statisticNotSyncReducer } from './statistic/not-sync'
import { categoriesStatusReducer } from './categories/status'

const reducers: ActionReducerMap<RootState> = {
	colors: colorsReducer,
	categories: categoriesReducer,
	statistic: statisticReducer,
	notSyncCategories: categoriesNotSyncReducer,
	notSyncStatistic: statisticNotSyncReducer,
	categoriesStatus: categoriesStatusReducer
}

export default reducers
