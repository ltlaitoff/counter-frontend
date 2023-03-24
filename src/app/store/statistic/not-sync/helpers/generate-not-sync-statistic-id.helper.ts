import { NOT_SYNC_ID_TAG } from '../../statistic.config'

export const generateNotSyncStatisticId = () => {
	return `${NOT_SYNC_ID_TAG}-${new Date(Date.now()).getTime()}`
}
