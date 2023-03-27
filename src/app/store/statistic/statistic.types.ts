import { NotSyncTypes } from './not-sync'
import { SyncTypes } from './sync'
import { StatisticStatusTypes as StatusTypes } from './status'

export type StatisticStateItem =
	| NotSyncTypes.StateItemWithDefaultStatistic
	| SyncTypes.StateItem

export { NotSyncTypes, SyncTypes, StatusTypes }
