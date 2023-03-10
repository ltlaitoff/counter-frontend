import { Injectable } from '@angular/core'
import {
	Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot
} from '@angular/router'
import { Store } from '@ngrx/store'
import { RootState } from '../store/rootTypes'
import { ColorsActions } from '../store/colors'

@Injectable({
	providedIn: 'root'
})
export class ColorResolver implements Resolve<boolean> {
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		this.store.dispatch(ColorsActions.loadColors())

		return true
	}

	constructor(private store: Store<RootState>) {}
}
