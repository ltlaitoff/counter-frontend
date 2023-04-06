export enum LoadStatus {
	NOT_SYNCHRONIZED = 'not-synchronized',
	SYNCHRONIZATION = 'synchronization',
	ERROR = 'error',
	SYNCHRONIZED = 'synchronized'
}

export enum NotSyncStatus {
	NOT_SYNCHRONIZED = 'not-synchronized',
	SYNCHRONIZATION = 'synchronization',
	ERROR = 'error'
}

export enum NotSyncAction {
	CREATED = 'created',
	CHANGED = 'changed',
	DELETED = 'deleted'
}

export interface NotSyncStateItemBase {
	action: NotSyncAction
	status: NotSyncStatus
}

export interface SyncStateItemBase {
	action?: never
	status?: never
}
