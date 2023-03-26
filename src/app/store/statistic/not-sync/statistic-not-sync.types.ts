import { Statistic, StatisticRequests } from 'src/types/Statistic'

export enum Status {
	NOT_SYNCHRONIZED = 'not-synchronized',
	SYNCHRONIZATION = 'synchronization',
	ERROR = 'error'
}

export enum Action {
	CREATED = 'created',
	CHANGED = 'changed',
	DELETED = 'deleted'
}

interface StateItemBase {
	action: Action
	status: Status
}

export type StateItem = StateItemBase & StatisticRequests
export type StateItemWithDefaultStatistic = StateItemBase & Statistic

export type NotSyncState = StateItem[]
