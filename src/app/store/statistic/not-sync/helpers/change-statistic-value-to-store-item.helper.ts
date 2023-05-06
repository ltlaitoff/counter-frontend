import { generateNotSyncStatisticId } from './generate-not-sync-statistic-id.helper'
import { AddStatisticInputs } from 'src/types/ApiInputs'
import { NotSyncStateItem, SyncStateItem } from '../../statistic.types'
import { NotSyncStatus, NotSyncAction } from 'src/app/store/store.types'

export function changeAddStatisticValueToStoreItem(
	data: AddStatisticInputs
): NotSyncStateItem {
	const forAdd = {
		...data,
		_id: generateNotSyncStatisticId(),
		status: NotSyncStatus.NOT_SYNCHRONIZED,
		action: NotSyncAction.CREATED
	}

	return forAdd
}

export function changeDeleteStatisticValueToStoreItem(
	data: SyncStateItem
): NotSyncStateItem {
	return {
		...data,
		date: new Date(data.date).toISOString(),
		status: NotSyncStatus.NOT_SYNCHRONIZED,
		action: NotSyncAction.DELETED
	}
}

export function changeUpdateStatisticValueToStoreItem(
	data: SyncStateItem,
	newData: AddStatisticInputs
): NotSyncStateItem {
	return {
		...data,
		status: NotSyncStatus.NOT_SYNCHRONIZED,
		action: NotSyncAction.DELETED,
		...newData
	}
}
