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
import { NotSyncTypes, NotSyncHelpers } from './not-sync'
import { CategoriesStatusActions, CategoriesStatusTypes } from './status'

@Injectable()
export class CategoriesEffects {
	/* Redirects */
	add$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoriesActions.add),
			// TODO: Why using exhaustMap?
			exhaustMap(categoryForAdd => {
				const categoryAsNotSyncStateItem: NotSyncTypes.StateItem =
					NotSyncHelpers.changeAddCategoryValueToStoreItem(categoryForAdd)

				return of(
					CategoriesNotSyncActions.add(categoryAsNotSyncStateItem),
					CategoriesActions.addeffect(categoryAsNotSyncStateItem)
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
					return [
						CategoriesNotSyncActions.delete(
							NotSyncHelpers.categoryColorToString(categoryForDelete)
						)
					]
				}

				const categoryAsNotSyncStateItem: NotSyncTypes.StateItem =
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
							status: CategoriesStatusTypes.Status.SYNCHRONIZATION
						})
					)

					return this.api.getAllCategories().pipe(
						mergeMap(value => [
							CategoriesSyncActions.set({ categories: value }),
							CategoriesStatusActions.set({
								status: CategoriesStatusTypes.Status.SYNCHRONIZED
							})
						]),
						catchError(() => {
							CategoriesStatusActions.set({
								status: CategoriesStatusTypes.Status.ERROR
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
						status: NotSyncTypes.Status.SYNCHRONIZATION,
						category: inputCategory
					})
				)

				return this.api.addCategory(inputCategory).pipe(
					switchMap(resultCategory => [
						CategoriesSyncActions.add({
							category: resultCategory
						}),
						CategoriesNotSyncActions.delete(inputCategory)
					]),
					catchError(() => {
						this.store.dispatch(
							CategoriesNotSyncActions.changestatus({
								status: NotSyncTypes.Status.ERROR,
								category: inputCategory
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
						status: NotSyncTypes.Status.SYNCHRONIZATION,
						category: inputCategory
					})
				)

				return this.api.deleteCategory(inputCategory._id).pipe(
					switchMap(() => [CategoriesNotSyncActions.delete(inputCategory)]),
					catchError(() => {
						this.store.dispatch(
							CategoriesNotSyncActions.changestatus({
								status: NotSyncTypes.Status.ERROR,
								category: inputCategory
							})
						)

						return EMPTY
					})
				)
			})
			/*
				
				
				
				


				CategoriesActions.delete 
				Должен принимать категорию целую

				Если категория - не синхронизированная и у неё статус Error либо Not-Sync.. то удаляем
				Если статус Synchronization - выдаём пользователю ошибку

				Если категория синхронизированная:
				- Добавляем новую not-sync категорию с deleted
				- Удаляем sync
				- Ставим статус Synchronization 
				- Делаем запрос на АПИ для удаления 
				- Если запрос успешный - удаляем из not-sync
				- Если запрос не успешный - ставим статус Error
				*/

			// // TODO: Add request to api for delete category

			// return this.api.deleteCategory(inputCategory).pipe(
			// 	switchMap(resultCategory => [
			// 		CategoriesSyncActions.add({
			// 			category: resultCategory
			// 		}),
			// 		CategoriesNotSyncActions.delete({
			// 	// TODO: Why using switchMap?	]),
			// 	catchError(() => {
			// 		this.store.dispatch(
			// 			CategoriesNotSyncActions.changestatus({
			// 				status: NotSyncTypes.Status.ERROR,
			// 				category: inputCategory
			// 			})
			// 		)

			// 		return EMPTY
			// 	})
			// )
		)
	)

	/*	
	TODO: 
	- [ ] changeCategory
	- [ ] Select
	*/

	/* Main effects end */

	constructor(
		private actions$: Actions,
		private api: ApiService,
		private store: Store<RootState>
	) {}
}
