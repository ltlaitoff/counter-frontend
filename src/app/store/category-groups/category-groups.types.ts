import {
	NotSyncStateItemBase,
	SyncStateItemBase
} from 'src/app/store/store.types'

import { CategoryGroup } from 'src/types/CategoryGroup'
import { Color } from 'src/types/Color'

export type CategoryGroupsItemToWithColor<T extends { color: string }> = Omit<
	T,
	'color'
> & {
	color: Color
}

export type CategoryGroupsNotSyncStateItem = NotSyncStateItemBase &
	CategoryGroup
export type CategoryGroupsNotSyncState = CategoryGroupsNotSyncStateItem[]
export type CategoryGroupsNotSyncStateItemWithColor =
	CategoryGroupsItemToWithColor<CategoryGroupsNotSyncStateItem>

export type CategoryGroupsSyncStateItem = SyncStateItemBase & CategoryGroup
export type CategoryGroupsSyncState = CategoryGroupsSyncStateItem[]
export type CategoryGroupsSyncStateItemWithColor =
	CategoryGroupsItemToWithColor<CategoryGroupsSyncStateItem>

export type CategoryGroupsStateItem =
	| CategoryGroupsSyncStateItem
	| CategoryGroupsNotSyncStateItem
export type CategoryGroupsStateItemWithColor =
	| CategoryGroupsNotSyncStateItemWithColor
	| CategoryGroupsSyncStateItemWithColor
