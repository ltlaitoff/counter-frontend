import { NotSyncTypes } from '..'
import { StatisticTypes } from '../..'
import { generateNotSyncStatisticId } from './generate-not-sync-statistic-id.helper'
import { AddStatisticInputs } from 'src/types/ApiInputs'

export function changeAddStatisticValueToStoreItem(
	data: AddStatisticInputs
): NotSyncTypes.StateItem {
	const forAdd = {
		...data,
		_id: generateNotSyncStatisticId(),
		status: NotSyncTypes.Status.NOT_SYNCHRONIZED,
		action: NotSyncTypes.Action.CREATED
	}

	return forAdd
}

export function changeDeleteStatisticValueToStoreItem(
	data: StatisticTypes.SyncTypes.StateItem
): NotSyncTypes.StateItem {
	return {
		...data,
		category: data.category._id,
		date: new Date(data.date).getTime(),
		status: NotSyncTypes.Status.NOT_SYNCHRONIZED,
		action: NotSyncTypes.Action.DELETED
	}
}

export function changeUpdateStatisticValueToStoreItem(
	data: StatisticTypes.SyncTypes.StateItem,
	newData: AddStatisticInputs
): NotSyncTypes.StateItem {
	return {
		...data,
		status: NotSyncTypes.Status.NOT_SYNCHRONIZED,
		action: NotSyncTypes.Action.DELETED,
		...newData
	}
}
