import { Injectable } from '@angular/core'
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Store } from '@ngrx/store'
import { CategoryGroupsActions } from '../store/category-groups/category-groups.actions'
import { RootState } from '../store/rootTypes'

@Injectable({
	providedIn: 'root'
})
export class CategoryGroupsResolver  {
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		this.store.dispatch(CategoryGroupsActions.load())

		return true
	}

	constructor(private store: Store<RootState>) {}
}
