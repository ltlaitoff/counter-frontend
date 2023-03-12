import { ActionReducerMap } from '@ngrx/store'
import { RootState } from './rootTypes'

import { colorsReducer } from './colors'
import { categoriesReducer } from './categories/sync'
import { categoriesNotSyncReducer } from './categories/not-sync'
import { statisticReducer } from './statistic'

const reducers: ActionReducerMap<RootState> = {
	colors: colorsReducer,
	categories: categoriesReducer,
	statistic: statisticReducer,
	notSyncCategories: categoriesNotSyncReducer
}

export default reducers
