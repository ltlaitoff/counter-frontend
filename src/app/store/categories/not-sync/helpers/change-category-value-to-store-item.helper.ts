import { AddCategoryInputs } from 'src/types/ApiInputs'
import { NotSyncTypes } from '..'
import { CategoriesTypes } from '../..'
import { generateNotSyncCategoryId } from './generate-not-sync-category-id.helper'

export function changeAddCategoryValueToStoreItem(
	data: AddCategoryInputs
): NotSyncTypes.StateItem {
	const forAdd = {
		...data,
		_id: generateNotSyncCategoryId(),
		status: NotSyncTypes.Status.NOT_SYNCHRONIZED,
		action: NotSyncTypes.Action.CREATED,
		order: 999
	}

	return forAdd
}

export function changeDeleteCategoryValueToStoreItem(
	data: CategoriesTypes.SyncTypes.StateItem
): NotSyncTypes.StateItem {
	return {
		...data,
		color: data.color._id,
		status: NotSyncTypes.Status.NOT_SYNCHRONIZED,
		action: NotSyncTypes.Action.DELETED
	}
}
