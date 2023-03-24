import { NotSyncTypes } from './not-sync'
import { SyncTypes } from './sync'

export type StatisticStateItem =
	| NotSyncTypes.StateItemWithDefaultStatistic
	| SyncTypes.StateItem

export { NotSyncTypes, SyncTypes }
