import { Category } from 'src/types/Category'

export type StateItem = Category & {
	status?: never
	action?: never
}

export type SyncState = StateItem[]
