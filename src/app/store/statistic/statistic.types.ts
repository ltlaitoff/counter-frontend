import { StatisticStatusTypes as StatusTypes } from './status'

import { Statistic } from 'src/types/Statistic'
import { NotSyncStateItemBase, SyncStateItemBase } from '../store.types'
import { CategoryStateItemWithColor } from '../categories/categories.types'

export type StatisticItemToWithCategory<T extends { category: string }> = Omit<
	T,
	'category'
> & {
	category: CategoryStateItemWithColor
}

export type NotSyncStateItem = NotSyncStateItemBase & Statistic
export type NotSyncState = NotSyncStateItem[]
export type StatisticNotSyncStateItemWithCategory =
	StatisticItemToWithCategory<NotSyncStateItem>

export type SyncStateItem = SyncStateItemBase & Statistic
export type SyncState = SyncStateItem[]
export type StatisticSyncStateItemWithCategory =
	StatisticItemToWithCategory<SyncStateItem>

export type StatisticStateItem = NotSyncStateItem | SyncStateItem
export type StatisticStateItemWithCategory =
	| StatisticNotSyncStateItemWithCategory
	| StatisticSyncStateItemWithCategory

export { StatusTypes }
