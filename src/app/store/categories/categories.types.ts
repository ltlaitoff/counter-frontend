import { NotSyncTypes } from './not-sync'
import { SyncTypes } from './sync'
import { CategoriesStatusTypes as StatusTypes } from './status'

export type CategoryStateItem =
	| NotSyncTypes.StateItemWithColor
	| SyncTypes.StateItem

export { NotSyncTypes, SyncTypes, StatusTypes }
