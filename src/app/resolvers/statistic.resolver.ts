import { Injectable } from '@angular/core'
import {
	Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot
} from '@angular/router'
import { Store } from '@ngrx/store'
import { RootState } from '../store/rootTypes'
import { StatisticActions } from '../store/statistic'

@Injectable({
	providedIn: 'root'
})
export class StatisticResolver implements Resolve<boolean> {
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		this.store.dispatch(StatisticActions.load())

		return true
	}

	constructor(private store: Store<RootState>) {}
}
