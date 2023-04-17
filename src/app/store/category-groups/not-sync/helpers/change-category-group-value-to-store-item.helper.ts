import { NotSyncStatus, NotSyncAction } from 'src/app/store/store.types'
import { AddCategoryGroupInputs } from 'src/types/ApiInputs'
import {
	CategoryGroupsNotSyncStateItem,
	CategoryGroupsSyncStateItem
} from '../../category-groups.types'
import { generateNotSyncCategoryGroupId } from './generate-not-sync-category-group-id.helper'

export function changeAddCategoryGroupValueToStoreItem(
	data: AddCategoryGroupInputs
): CategoryGroupsNotSyncStateItem {
	const forAdd = {
		...data,
		_id: generateNotSyncCategoryGroupId(),
		status: NotSyncStatus.NOT_SYNCHRONIZED,
		action: NotSyncAction.CREATED,
		order: 999
	}

	return forAdd
}

export function changeDeleteCategoryGroupValueToStoreItem(
	data: CategoryGroupsSyncStateItem
): CategoryGroupsNotSyncStateItem {
	return {
		...data,
		status: NotSyncStatus.NOT_SYNCHRONIZED,
		action: NotSyncAction.DELETED
	}
}

export function changeUpdateCategoryGroupValueToStoreItem(
	oldCategoryData: CategoryGroupsSyncStateItem,
	newCategoryData: Partial<AddCategoryGroupInputs>
): CategoryGroupsNotSyncStateItem {
	return {
		...oldCategoryData,
		status: NotSyncStatus.NOT_SYNCHRONIZED,
		action: NotSyncAction.CHANGED,
		...newCategoryData
	}
}
