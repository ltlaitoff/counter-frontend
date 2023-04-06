import { RootState } from '../rootTypes'
import {
	NotSyncState,
	StatisticStateItemWithCategory,
	SyncState
} from './statistic.types'
import { StatisticStatusTypes } from './status'
import { changeStatisticCategoryIdToCategoryObject } from './helpers/change-statistic-category-id-to-category-object.helper'
import { createSelector } from '@ngrx/store'

import { selectCategories } from 'src/app/store/categories/categories.select'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import {
	StatisticStateItem,
	StatisticNotSyncStateItemWithCategory,
	NotSyncStateItem
} from './statistic.types'

const selectNotSyncStatistic = (state: RootState) => {
	return state.notSyncStatistic
}

const selectSyncStatistic = (state: RootState) => {
	return state.statistic
}

export const selectNotSyncStatisticWithCategory = createSelector(
	selectNotSyncStatistic,
	selectCategories,
	(
		notSyncStatistic: NotSyncState,
		categories: CategoryStateItemWithColor[]
	): StatisticNotSyncStateItemWithCategory[] => {
		return changeStatisticCategoryIdToCategoryObject<NotSyncStateItem>(
			notSyncStatistic,
			categories
		) as StatisticNotSyncStateItemWithCategory[]
	}
)

export const selectStatistic = createSelector(
	selectSyncStatistic,
	selectNotSyncStatistic,
	selectCategories,
	(
		syncStatistic: SyncState,
		notSyncStatistic: NotSyncState,
		categories: CategoryStateItemWithColor[]
	): StatisticStateItemWithCategory[] => {
		return changeStatisticCategoryIdToCategoryObject(
			[...syncStatistic, ...notSyncStatistic],
			categories
		)
	}
)

export const selectStatisticStatus = (
	state: RootState
): StatisticStatusTypes.StatusState => {
	return state.statisticStatus
}
