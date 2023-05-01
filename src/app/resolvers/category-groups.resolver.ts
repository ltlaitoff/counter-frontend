import { Injectable } from '@angular/core'
import {
	Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot
} from '@angular/router'
import { Store } from '@ngrx/store'
import { CategoryGroupsActions } from '../store/category-groups/category-groups.actions'
import { RootState } from '../store/rootTypes'

@Injectable({
	providedIn: 'root'
})
export class CategoryGroupsResolver implements Resolve<boolean> {
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		this.store.dispatch(CategoryGroupsActions.load())

		return true
	}

	constructor(private store: Store<RootState>) {}
}
