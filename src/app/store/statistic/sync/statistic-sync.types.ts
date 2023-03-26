import { Statistic } from 'src/types/Statistic'

export type StateItem = Statistic & {
	status?: never
	action?: never
}

export type SyncState = StateItem[]
