import { ResolveFn } from '@angular/router'
import { inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { RootState } from '../store/rootTypes'
import { CategoriesActions } from '../store/categories/categories.actions'

export const categoriesResolver: ResolveFn<boolean> = (route, state) => {
	const store = inject(Store<RootState>)

	store.dispatch(CategoriesActions.load())

	return true
}
