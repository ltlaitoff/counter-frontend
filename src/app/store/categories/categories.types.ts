import { NotSyncTypes } from './not-sync'
import { SyncTypes } from './sync'

export type CategoryStateItem =
	| NotSyncTypes.StateItemWithColor
	| SyncTypes.StateItem

export { NotSyncTypes, SyncTypes }
