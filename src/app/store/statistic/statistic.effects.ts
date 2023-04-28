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
import { NotSyncHelpers } from './not-sync'
import { StatisticStatusActions, StatisticStatusTypes } from './status'
import { NotSyncStateItem, SyncState } from './statistic.types'
import { NotSyncStatus } from '../store.types'
import { statisticStateItemWithCategoryToDefault } from './helpers/statistic-state-item-with-category-to-default.helper'

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
			withLatestFrom(this.store.pipe(select('statistic'))),
			// TODO: Why using exhaustMap?
			exhaustMap(([statisticForAdd, storeStatisticData]) => {
				const statisticAsNotSyncStateItem: NotSyncStateItem =
					NotSyncHelpers.changeAddStatisticValueToStoreItem(statisticForAdd)

				return of(
					StatisticNotSyncActions.add(statisticAsNotSyncStateItem),
					StatisticActions.addeffect({
						statistic: statisticAsNotSyncStateItem,
						storeStatisticData: storeStatisticData
					})
				)
			})
		)
	)

	update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StatisticActions.update),
			// TODO: Why using exhaustMap?
			exhaustMap(categoryForUpdate => {
				const oldStatistic = statisticStateItemWithCategoryToDefault(
					categoryForUpdate.oldStatistic
				)

				if (oldStatistic.status) {
					return [
						StatisticNotSyncActions.update({
							oldStatistic: oldStatistic,
							dataForUpdate: categoryForUpdate.dataForUpdate
						})
					]
				}

				const oldStatisticAsNotSyncStateItem: NotSyncStateItem =
					NotSyncHelpers.changeUpdateStatisticValueToStoreItem(
						oldStatistic,
						categoryForUpdate.dataForUpdate
					)

				return of(
					StatisticNotSyncActions.add(oldStatisticAsNotSyncStateItem),
					StatisticSyncActions.delete(oldStatistic),
					StatisticActions.updateeffect(oldStatisticAsNotSyncStateItem)
				)
			})
		)
	)

	delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StatisticActions.delete),
			// TODO: Why using exhaustMap?
			exhaustMap(statisticForDeleteInput => {
				const statisticForDelete = statisticStateItemWithCategoryToDefault(
					statisticForDeleteInput
				)

				if (statisticForDelete.status) {
					return [StatisticNotSyncActions.delete(statisticForDelete)]
				}

				const statisticAsNotSyncStateItem: NotSyncStateItem =
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
			mergeMap(({ statistic, storeStatisticData }) => {
				this.store.dispatch(
					StatisticNotSyncActions.changestatus({
						status: NotSyncStatus.SYNCHRONIZATION,
						statistic: statistic
					})
				)

				this.store.dispatch(
					StatisticStatusActions.set({
						status: StatisticStatusTypes.StatusState.SYNCHRONIZATION
					})
				)

				return this.api.addStatisticRecord(statistic).pipe(
					switchMap(resultStatistic => {
						if (storeStatisticData.length === 0) {
							this.store.dispatch(StatisticActions.load())
						}

						return [
							StatisticSyncActions.add({
								statistic: resultStatistic
							}),

							StatisticStatusActions.set({
								status: StatisticStatusTypes.StatusState.SYNCHRONIZED
							}),

							StatisticNotSyncActions.delete(statistic)
						]
					}),

					catchError(() => {
						this.store.dispatch(
							StatisticNotSyncActions.changestatus({
								status: NotSyncStatus.ERROR,
								statistic: statistic
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
						status: NotSyncStatus.SYNCHRONIZATION,
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
								status: NotSyncStatus.ERROR,
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
			mergeMap(inputStatistic => {
				this.store.dispatch(
					StatisticNotSyncActions.changestatus({
						status: NotSyncStatus.SYNCHRONIZATION,
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

							StatisticNotSyncActions.delete(inputStatistic)
						]),
						catchError(() => {
							this.store.dispatch(
								StatisticNotSyncActions.changestatus({
									status: NotSyncStatus.ERROR,
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
