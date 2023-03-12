import { Category, CategoryColorString } from 'src/types/Category'

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

export type StateItem = StateItemBase & CategoryColorString
export type StateItemWithColor = StateItemBase & Category

export type NotSyncState = StateItem[]
