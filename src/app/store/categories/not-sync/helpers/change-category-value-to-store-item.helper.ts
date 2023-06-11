import { NotSyncStatus, NotSyncAction } from 'src/app/store/store.types'
import { CategoriesBasicSet } from 'src/types/ApiInputs'
import { NotSyncStateItem, SyncStateItem } from '../../categories.types'
import { generateNotSyncCategoryId } from './generate-not-sync-category-id.helper'

export function changeAddCategoryValueToStoreItem(
	data: CategoriesBasicSet
): NotSyncStateItem {
	const forAdd = {
		...data,
		_id: generateNotSyncCategoryId(),
		status: NotSyncStatus.NOT_SYNCHRONIZED,
		action: NotSyncAction.CREATED,
		order: 999,
		mode: data.mode || 'number'
	}

	return forAdd
}

export function changeDeleteCategoryValueToStoreItem(
	data: SyncStateItem
): NotSyncStateItem {
	return {
		...data,
		status: NotSyncStatus.NOT_SYNCHRONIZED,
		action: NotSyncAction.DELETED
	}
}

export function changeUpdateCategoryValueToStoreItem(
	oldCategoryData: SyncStateItem,
	newCategoryData: Partial<CategoriesBasicSet>
): NotSyncStateItem {
	return {
		...oldCategoryData,
		status: NotSyncStatus.NOT_SYNCHRONIZED,
		action: NotSyncAction.CHANGED,
		...newCategoryData
	}
}
