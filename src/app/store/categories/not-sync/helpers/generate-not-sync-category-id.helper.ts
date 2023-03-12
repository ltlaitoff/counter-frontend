import { NOT_SYNC_ID_TAG } from '../../categories.config'

export const generateNotSyncCategoryId = () => {
	return `${NOT_SYNC_ID_TAG}-${new Date(Date.now()).getTime()}`
}
