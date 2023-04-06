import { CategoriesStatusTypes as StatusTypes } from './status'
import { Category } from 'src/types/Category'
import { NotSyncStateItemBase, SyncStateItemBase } from '../store.types'
import { Color } from 'src/types/Color'

export type CategoryItemToWithColor<T extends { color: string }> = Omit<
	T,
	'color'
> & {
	color: Color
}

export type NotSyncStateItem = NotSyncStateItemBase & Category
export type NotSyncState = NotSyncStateItem[]
export type CategoryNotSyncStateItemWithColor =
	CategoryItemToWithColor<NotSyncStateItem>

export type SyncStateItem = SyncStateItemBase & Category
export type SyncState = SyncStateItem[]
export type CategorySyncStateItemWithColor =
	CategoryItemToWithColor<SyncStateItem>

export type CategoryStateItem = SyncStateItem | NotSyncStateItem
export type CategoryStateItemWithColor =
	| CategoryNotSyncStateItemWithColor
	| CategorySyncStateItemWithColor

export { StatusTypes }
