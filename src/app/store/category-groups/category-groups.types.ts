import {
	NotSyncStateItemBase,
	SyncStateItemBase
} from 'src/app/store/store.types'

import { CategoryGroup } from 'src/types/CategoryGroup'

export type CategoryGroupsNotSyncStateItem = NotSyncStateItemBase &
	CategoryGroup
export type CategoryGroupsNotSyncState = CategoryGroupsNotSyncStateItem[]

export type CategoryGroupsSyncStateItem = SyncStateItemBase & CategoryGroup
export type CategoryGroupsSyncState = CategoryGroupsSyncStateItem[]

export type CategoryGroupsStateItem =
	| CategoryGroupsSyncStateItem
	| CategoryGroupsNotSyncStateItem
