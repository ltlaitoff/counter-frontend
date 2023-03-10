import { Injectable } from '@angular/core'
import {
	Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot
} from '@angular/router'
import { Store } from '@ngrx/store'
import { RootState } from '../store/rootTypes'
import { CategoriesActions } from '../store/categories/categories.actions'

@Injectable({
	providedIn: 'root'
})
export class CategoryResolver implements Resolve<boolean> {
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		this.store.dispatch(CategoriesActions.load())

		return true
	}

	constructor(private store: Store<RootState>) {}
}
