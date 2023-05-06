import { NOT_SYNC_ID_TAG } from '../../category-groups.config'

export const generateNotSyncCategoryGroupId = () => {
	return `${NOT_SYNC_ID_TAG}-${new Date(Date.now()).getTime()}`
}
