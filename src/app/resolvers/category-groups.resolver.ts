import { ResolveFn } from '@angular/router'
import { inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { CategoryGroupsActions } from '../store/category-groups/category-groups.actions'
import { RootState } from '../store/rootTypes'

export const categoryGroupsResolver: ResolveFn<boolean> = (route, state) => {
	const store = inject(Store<RootState>)

	store.dispatch(CategoryGroupsActions.load())

	return true
}
