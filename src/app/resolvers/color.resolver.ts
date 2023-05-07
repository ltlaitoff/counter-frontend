import { ResolveFn } from '@angular/router'
import { inject } from '@angular/core'
import { Store } from '@ngrx/store'
import { RootState } from '../store/rootTypes'
import { ColorsActions } from '../store/colors'

export const colorResolver: ResolveFn<boolean> = (route, state) => {
	const store = inject(Store<RootState>)

	store.dispatch(ColorsActions.loadColors())

	return true
}
