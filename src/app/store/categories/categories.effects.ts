import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { EMPTY, of } from 'rxjs'
import {
	map,
	switchMap,
	exhaustMap,
	catchError,
	withLatestFrom,
	mergeMap
} from 'rxjs/operators'
import { ApiService } from 'src/app/services/api.service'
import { CategoriesActions } from './categories.actions'
import { CategoriesNotSyncActions } from './not-sync/categories-not-sync.actions'
import { CategoriesSyncActions } from './sync/categories-sync.actions'

import { RootState } from '../rootTypes'
import { NotSyncHelpers } from './not-sync'
import { CategoriesStatusActions, CategoriesStatusTypes } from './status'
import { StatisticActions } from '../statistic/statistic.actions'
import { NotSyncStateItem } from './categories.types'
import { NotSyncStatus } from '../store.types'

@Injectable()
export class CategoriesEffects {
	/* Redirects */
	add$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoriesActions.add),
			// TODO: Why using exhaustMap?
			exhaustMap(categoryForAdd => {
				const categoryAsNotSyncStateItem: NotSyncStateItem =
					NotSyncHelpers.changeAddCategoryValueToStoreItem(categoryForAdd)

				return of(
					CategoriesNotSyncActions.add(categoryAsNotSyncStateItem),
					CategoriesActions.addeffect(categoryAsNotSyncStateItem)
				)
			})
		)
	)

	update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoriesActions.update),
			// TODO: Why using exhaustMap?
			exhaustMap(categoryForUpdate => {
				if (categoryForUpdate.oldCategory.status) {
					return [
						CategoriesNotSyncActions.update({
							oldCategory: categoryForUpdate.oldCategory,
							dataForUpdate: categoryForUpdate.dataForUpdate
						})
					]
				}

				const oldCategoryAsNotSyncStateItem: NotSyncStateItem =
					NotSyncHelpers.changeUpdateCategoryValueToStoreItem(
						categoryForUpdate.oldCategory,
						categoryForUpdate.dataForUpdate
					)

				return of(
					CategoriesNotSyncActions.add(oldCategoryAsNotSyncStateItem),
					CategoriesSyncActions.delete(categoryForUpdate.oldCategory),
					CategoriesActions.updateeffect(oldCategoryAsNotSyncStateItem)
				)
			})
		)
	)

	delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoriesActions.delete),
			// TODO: Why using exhaustMap?
			exhaustMap(categoryForDelete => {
				if (categoryForDelete.status) {
					return of(CategoriesNotSyncActions.delete(categoryForDelete))
				}

				const categoryAsNotSyncStateItem: NotSyncStateItem =
					NotSyncHelpers.changeDeleteCategoryValueToStoreItem(categoryForDelete)

				return of(
					CategoriesNotSyncActions.add(categoryAsNotSyncStateItem),
					CategoriesSyncActions.delete(categoryForDelete),
					CategoriesActions.deleteeffect(categoryAsNotSyncStateItem)
				)
			})
		)
	)
	/* Redirects end */

	/* Main effects */
	loadCategories$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoriesActions.load),
			withLatestFrom(this.store.pipe(select('categories'))),
			// TODO: Why using exhaustMap?
			exhaustMap(([params, categoriesValue]) => {
				if (categoriesValue.length === 0 || params.force) {
					this.store.dispatch(
						CategoriesStatusActions.set({
							status: CategoriesStatusTypes.StatusState.SYNCHRONIZATION
						})
					)

					return this.api.getAllCategories().pipe(
						mergeMap(value => [
							CategoriesSyncActions.set({ categories: value }),
							CategoriesStatusActions.set({
								status: CategoriesStatusTypes.StatusState.SYNCHRONIZED
							})
						]),
						catchError(() => {
							CategoriesStatusActions.set({
								status: CategoriesStatusTypes.StatusState.ERROR
							})

							return EMPTY
						})
					)
				}

				return EMPTY
			})
		)
	)

	addCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoriesActions.addeffect),
			// TODO: Why using switchMap?
			switchMap(inputCategory => {
				this.store.dispatch(
					CategoriesNotSyncActions.changestatus({
						status: NotSyncStatus.SYNCHRONIZATION,
						category: inputCategory
					})
				)

				this.store.dispatch(
					CategoriesStatusActions.set({
						status: CategoriesStatusTypes.StatusState.SYNCHRONIZATION
					})
				)

				return this.api.addCategory(inputCategory).pipe(
					switchMap(resultCategory => [
						CategoriesSyncActions.add({
							category: resultCategory
						}),

						CategoriesStatusActions.set({
							status: CategoriesStatusTypes.StatusState.SYNCHRONIZED
						}),

						CategoriesNotSyncActions.delete(inputCategory)
					]),
					catchError(() => {
						this.store.dispatch(
							CategoriesNotSyncActions.changestatus({
								status: NotSyncStatus.ERROR,
								category: inputCategory
							})
						)

						this.store.dispatch(
							CategoriesStatusActions.set({
								status: CategoriesStatusTypes.StatusState.ERROR
							})
						)

						return EMPTY
					})
				)
			})
		)
	)

	deleteCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoriesActions.deleteeffect),
			// TODO: Why using switchMap?
			switchMap(inputCategory => {
				this.store.dispatch(
					CategoriesNotSyncActions.changestatus({
						status: NotSyncStatus.SYNCHRONIZATION,
						category: inputCategory
					})
				)

				this.store.dispatch(
					CategoriesStatusActions.set({
						status: CategoriesStatusTypes.StatusState.SYNCHRONIZATION
					})
				)

				return this.api.deleteCategory(inputCategory._id).pipe(
					switchMap(() => [
						CategoriesStatusActions.set({
							status: CategoriesStatusTypes.StatusState.SYNCHRONIZED
						}),
						CategoriesNotSyncActions.delete(inputCategory)
					]),
					catchError(() => {
						this.store.dispatch(
							CategoriesNotSyncActions.changestatus({
								status: NotSyncStatus.ERROR,
								category: inputCategory
							})
						)

						this.store.dispatch(
							CategoriesStatusActions.set({
								status: CategoriesStatusTypes.StatusState.ERROR
							})
						)

						return EMPTY
					})
				)
			})
		)
	)

	updateCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoriesActions.updateeffect),
			// TODO: Why using switchMap?
			switchMap(inputCategory => {
				this.store.dispatch(
					CategoriesNotSyncActions.changestatus({
						status: NotSyncStatus.SYNCHRONIZATION,
						category: inputCategory
					})
				)

				this.store.dispatch(
					CategoriesStatusActions.set({
						status: CategoriesStatusTypes.StatusState.SYNCHRONIZATION
					})
				)

				return this.api.updateCategory(inputCategory._id, inputCategory).pipe(
					switchMap(resultCategory => [
						CategoriesSyncActions.add({
							category: resultCategory
						}),

						CategoriesStatusActions.set({
							status: CategoriesStatusTypes.StatusState.SYNCHRONIZED
						}),

						CategoriesNotSyncActions.delete(inputCategory),

						// TODO: Remove it after [#62](https://github.com/ltlaitoff/counter-frontend/issues/62)
						StatisticActions.load({ force: true })
					]),
					catchError(() => {
						this.store.dispatch(
							CategoriesNotSyncActions.changestatus({
								status: NotSyncStatus.ERROR,
								category: inputCategory
							})
						)

						this.store.dispatch(
							CategoriesStatusActions.set({
								status: CategoriesStatusTypes.StatusState.ERROR
							})
						)

						return EMPTY
					})
				)
			})
		)
	)

	/* Main effects end */

	constructor(
		private actions$: Actions,
		private api: ApiService,
		private store: Store<RootState>
	) {}
}
