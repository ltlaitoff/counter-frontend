import { props, createActionGroup } from '@ngrx/store'
import { Category } from 'src/types/Category'
import * as SyncTypes from './categories-sync.types'

export const CategoriesSyncActions = createActionGroup({
	source: 'Categories sync',
	events: {
		set: props<{ categories: SyncTypes.SyncState }>(),
		add: props<{ category: SyncTypes.StateItem }>(),
		delete: props<SyncTypes.StateItem>()

		// TODO: Create change
		// change: props<{ category: Category }>()
	}
})
