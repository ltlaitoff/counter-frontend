import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { EMPTY, of } from 'rxjs'
import {
	map,
	exhaustMap,
	catchError,
	withLatestFrom,
	mergeMap,
	switchMap
} from 'rxjs/operators'
import { ApiService } from 'src/app/services/api.service'
import { StatisticActions } from '.'
import { StatisticNotSyncActions } from './not-sync/statistic-not-sync.actions'
import { StatisticSyncActions } from './sync/statistic-sync.actions'

import { RootState } from '../rootTypes'
import { NotSyncHelpers, NotSyncTypes } from './not-sync'
import { StatisticStatusActions, StatisticStatusTypes } from './status'

@Injectable()
export class StatisticEffects {
	loadStatistic$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StatisticActions.load),
			withLatestFrom(this.store.pipe(select('statistic'))),
			// TODO: Why using exhaustMap?
			exhaustMap(([params, statisticValue]) => {
				if (statisticValue.length === 0 || params.force) {
					this.store.dispatch(
						StatisticStatusActions.set({
							status: StatisticStatusTypes.StatusState.SYNCHRONIZATION
						})
					)

					return this.api.getAllStatisticRecords().pipe(
						mergeMap(value => {
							return [
								StatisticStatusActions.set({
									status: StatisticStatusTypes.StatusState.SYNCHRONIZED
								}),
								StatisticSyncActions.set({ statistic: value })
							]
						}),
						catchError(() => {
							this.store.dispatch(
								StatisticStatusActions.set({
									status: StatisticStatusTypes.StatusState.ERROR
								})
							)

							return EMPTY
						})
					)
				}

				return EMPTY
			})
		)
	)

	/* Redirects */
	add$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StatisticActions.add),
			// TODO: Why using exhaustMap?
			exhaustMap(statisticForAdd => {
				const statisticAsNotSyncStateItem: NotSyncTypes.StateItem =
					NotSyncHelpers.changeAddStatisticValueToStoreItem(statisticForAdd)

				return of(
					StatisticNotSyncActions.add(statisticAsNotSyncStateItem),
					StatisticActions.addeffect(statisticAsNotSyncStateItem)
				)
			})
		)
	)

	update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StatisticActions.update),
			// TODO: Why using exhaustMap?
			exhaustMap(categoryForUpdate => {
				if (categoryForUpdate.oldStatistic.status) {
					return [
						StatisticNotSyncActions.update({
							oldStatistic: NotSyncHelpers.statisticDefaultToStatisticNotSync(
								categoryForUpdate.oldStatistic
							),
							dataForUpdate: categoryForUpdate.dataForUpdate
						})
					]
				}

				const oldStatisticAsNotSyncStateItem: NotSyncTypes.StateItem =
					NotSyncHelpers.changeUpdateStatisticValueToStoreItem(
						categoryForUpdate.oldStatistic,
						categoryForUpdate.dataForUpdate
					)

				return of(
					StatisticNotSyncActions.add(oldStatisticAsNotSyncStateItem),
					StatisticSyncActions.delete(categoryForUpdate.oldStatistic),
					StatisticActions.updateeffect(oldStatisticAsNotSyncStateItem)
				)
			})
		)
	)

	delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StatisticActions.delete),
			// TODO: Why using exhaustMap?
			exhaustMap(statisticForDelete => {
				if (statisticForDelete.status) {
					return [
						StatisticNotSyncActions.delete(
							NotSyncHelpers.statisticDefaultToStatisticNotSync(
								statisticForDelete
							)
						)
					]
				}

				const statisticAsNotSyncStateItem: NotSyncTypes.StateItem =
					NotSyncHelpers.changeDeleteStatisticValueToStoreItem(
						statisticForDelete
					)

				return of(
					StatisticNotSyncActions.add(statisticAsNotSyncStateItem),
					StatisticSyncActions.delete(statisticForDelete),
					StatisticActions.deleteeffect(statisticAsNotSyncStateItem)
				)
			})
		)
	)
	/* Redirects end */

	/* Main effects */
	addStatistic$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StatisticActions.addeffect),
			mergeMap(inputStatistic => {
				this.store.dispatch(
					StatisticNotSyncActions.changestatus({
						status: NotSyncTypes.Status.SYNCHRONIZATION,
						statistic: inputStatistic
					})
				)

				this.store.dispatch(
					StatisticStatusActions.set({
						status: StatisticStatusTypes.StatusState.SYNCHRONIZATION
					})
				)

				return this.api.addStatisticRecord(inputStatistic).pipe(
					switchMap(resultStatistic => [
						StatisticSyncActions.add({
							statistic: resultStatistic
						}),

						StatisticStatusActions.set({
							status: StatisticStatusTypes.StatusState.SYNCHRONIZED
						}),

						StatisticNotSyncActions.delete(inputStatistic)
					]),

					catchError(() => {
						this.store.dispatch(
							StatisticNotSyncActions.changestatus({
								status: NotSyncTypes.Status.ERROR,
								statistic: inputStatistic
							})
						)

						this.store.dispatch(
							StatisticStatusActions.set({
								status: StatisticStatusTypes.StatusState.ERROR
							})
						)

						return EMPTY
					})
				)
			})
		)
	)

	deleteStatistic$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StatisticActions.deleteeffect),
			mergeMap(inputStatistic => {
				this.store.dispatch(
					StatisticNotSyncActions.changestatus({
						status: NotSyncTypes.Status.SYNCHRONIZATION,
						statistic: inputStatistic
					})
				)

				this.store.dispatch(
					StatisticStatusActions.set({
						status: StatisticStatusTypes.StatusState.SYNCHRONIZATION
					})
				)

				return this.api.deleteStatistic(inputStatistic._id).pipe(
					switchMap(() => [
						StatisticStatusActions.set({
							status: StatisticStatusTypes.StatusState.SYNCHRONIZED
						}),

						StatisticNotSyncActions.delete(inputStatistic)
					]),
					catchError(() => {
						this.store.dispatch(
							StatisticNotSyncActions.changestatus({
								status: NotSyncTypes.Status.ERROR,
								statistic: inputStatistic
							})
						)

						this.store.dispatch(
							StatisticStatusActions.set({
								status: StatisticStatusTypes.StatusState.ERROR
							})
						)

						return EMPTY
					})
				)
			})
		)
	)

	updateStatistic$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StatisticActions.updateeffect),
			// TODO: Why using switchMap?
			mergeMap(inputStatistic => {
				this.store.dispatch(
					StatisticNotSyncActions.changestatus({
						status: NotSyncTypes.Status.SYNCHRONIZATION,
						statistic: inputStatistic
					})
				)

				this.store.dispatch(
					StatisticStatusActions.set({
						status: StatisticStatusTypes.StatusState.SYNCHRONIZATION
					})
				)

				return this.api
					.updateStatistic(inputStatistic._id, inputStatistic)
					.pipe(
						switchMap(resultStatistic => [
							StatisticSyncActions.add({
								statistic: resultStatistic
							}),

							StatisticStatusActions.set({
								status: StatisticStatusTypes.StatusState.SYNCHRONIZED
							}),

							StatisticNotSyncActions.delete(inputStatistic),

							// TODO: Remove it after [#62](https://github.com/ltlaitoff/counter-frontend/issues/62)
							StatisticActions.load({ force: true })
						]),
						catchError(() => {
							this.store.dispatch(
								StatisticNotSyncActions.changestatus({
									status: NotSyncTypes.Status.ERROR,
									statistic: inputStatistic
								})
							)

							this.store.dispatch(
								StatisticStatusActions.set({
									status: StatisticStatusTypes.StatusState.ERROR
								})
							)

							return EMPTY
						})
					)
			})
		)
	)

	constructor(
		private actions$: Actions,
		private api: ApiService,
		private store: Store<RootState>
	) {}
}
