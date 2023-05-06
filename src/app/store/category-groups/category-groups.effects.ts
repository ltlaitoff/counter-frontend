import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { EMPTY, of } from 'rxjs'
import { switchMap, catchError, withLatestFrom, mergeMap } from 'rxjs/operators'
import { ApiService } from 'src/app/services/api.service'
import { CategoryGroupsActions } from './category-groups.actions'
import { CategoryGroupsNotSyncActions } from './not-sync/category-groups-not-sync.actions'
import { CategoryGroupsSyncActions } from './sync/category-groups-sync.actions'

import { RootState } from '../rootTypes'
import { NotSyncHelpers } from './not-sync'
import { CategoryGroupsNotSyncStateItem } from './category-groups.types'
import { NotSyncStatus } from '../store.types'
import { categoryStateItemWithColorToDefault } from './helpers/category-state-item-with-color-to-default.helper'

@Injectable()
export class CategoryGroupsEffects {
	/* Redirects */
	add$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoryGroupsActions.add),
			mergeMap(payloadf => {
				const payloadAsNotSyncStateItem: CategoryGroupsNotSyncStateItem =
					NotSyncHelpers.changeAddCategoryGroupValueToStoreItem(payloadf)

				return of(
					CategoryGroupsNotSyncActions.add(payloadAsNotSyncStateItem),
					CategoryGroupsActions.addeffect(payloadAsNotSyncStateItem)
				)
			})
		)
	)

	update$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoryGroupsActions.update),
			mergeMap(payload => {
				const oldCategoryGroup = categoryStateItemWithColorToDefault(
					payload.old
				)

				if (oldCategoryGroup.status) {
					return [
						CategoryGroupsNotSyncActions.update({
							oldCategory: oldCategoryGroup,
							dataForUpdate: payload.dataForUpdate
						})
					]
				}

				const payloadAsNotSyncStateItem: CategoryGroupsNotSyncStateItem =
					NotSyncHelpers.changeUpdateCategoryGroupValueToStoreItem(
						oldCategoryGroup,
						payload.dataForUpdate
					)

				return of(
					CategoryGroupsNotSyncActions.add(payloadAsNotSyncStateItem),
					CategoryGroupsSyncActions.delete(oldCategoryGroup),
					CategoryGroupsActions.updateeffect(payloadAsNotSyncStateItem)
				)
			})
		)
	)

	reorder$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoryGroupsActions.reorder),
			switchMap(({ props, previousIndex, currentIndex }) => {
				const categoryAsStateItem = props

				if (categoryAsStateItem.status) {
					return of()
				}

				const categoryGroupWithoutColor = {
					...categoryAsStateItem,
					color: categoryAsStateItem.color._id
				}

				const oldCategoryAsCategoryGroupsNotSyncStateItem: CategoryGroupsNotSyncStateItem =
					{
						...NotSyncHelpers.changeUpdateCategoryGroupValueToStoreItem(
							categoryGroupWithoutColor,
							{}
						),
						order:
							previousIndex < currentIndex ? currentIndex + 1 : currentIndex
					}

				return of(
					CategoryGroupsNotSyncActions.add(
						oldCategoryAsCategoryGroupsNotSyncStateItem
					),
					CategoryGroupsSyncActions.delete(categoryGroupWithoutColor),
					CategoryGroupsActions.reordereffect({
						props: oldCategoryAsCategoryGroupsNotSyncStateItem,
						previousIndex,
						currentIndex
					})
				)
			})
		)
	)

	delete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoryGroupsActions.delete),
			switchMap(payloadInput => {
				const payload = categoryStateItemWithColorToDefault(payloadInput)

				if (payload.status) {
					return of(CategoryGroupsNotSyncActions.delete(payload))
				}

				const payloadAsNotSyncStateItem =
					NotSyncHelpers.changeDeleteCategoryGroupValueToStoreItem(payload)

				return of(
					CategoryGroupsNotSyncActions.add(payloadAsNotSyncStateItem),
					CategoryGroupsSyncActions.delete(payload),
					CategoryGroupsActions.deleteeffect(payloadAsNotSyncStateItem)
				)
			})
		)
	)
	/* Redirects end */

	/* Main effects */
	loadCategoryGroups$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoryGroupsActions.load),
			// TODO: Change categories after set in root
			withLatestFrom(this.store.pipe(select('categories'))),
			switchMap(([params, categoriesValue]) => {
				if (categoriesValue.length === 0 || params.force) {
					return this.api.getAllCategoryGroups().pipe(
						mergeMap(value =>
							of(CategoryGroupsSyncActions.set({ payload: value }))
						),
						catchError(() => EMPTY)
					)
				}

				return EMPTY
			})
		)
	)

	addCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoryGroupsActions.addeffect),
			switchMap(payload => {
				this.store.dispatch(
					CategoryGroupsNotSyncActions.changestatus({
						status: NotSyncStatus.SYNCHRONIZATION,
						payload: payload
					})
				)

				return this.api.addCategoryGroups(payload).pipe(
					switchMap(resultCategory =>
						of(
							CategoryGroupsSyncActions.add({
								payload: resultCategory
							}),
							CategoryGroupsNotSyncActions.delete(payload)
						)
					),
					catchError(() =>
						of(
							CategoryGroupsNotSyncActions.changestatus({
								status: NotSyncStatus.ERROR,
								payload: payload
							})
						)
					)
				)
			})
		)
	)

	deleteCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoryGroupsActions.deleteeffect),
			switchMap(payload => {
				this.store.dispatch(
					CategoryGroupsNotSyncActions.changestatus({
						status: NotSyncStatus.SYNCHRONIZATION,
						payload: payload
					})
				)

				return this.api.deleteCategoryGroups(payload._id).pipe(
					switchMap(() => of(CategoryGroupsNotSyncActions.delete(payload))),
					catchError(() =>
						of(
							CategoryGroupsNotSyncActions.changestatus({
								status: NotSyncStatus.ERROR,
								payload: payload
							})
						)
					)
				)
			})
		)
	)

	updateCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoryGroupsActions.updateeffect),
			switchMap(payload => {
				this.store.dispatch(
					CategoryGroupsNotSyncActions.changestatus({
						status: NotSyncStatus.SYNCHRONIZATION,
						payload: payload
					})
				)

				return this.api.updateCategoryGroups(payload._id, payload).pipe(
					switchMap(resultCategory =>
						of(
							CategoryGroupsSyncActions.add({
								payload: resultCategory
							}),

							CategoryGroupsNotSyncActions.delete(payload)
						)
					),
					catchError(() => {
						return of(
							CategoryGroupsNotSyncActions.changestatus({
								status: NotSyncStatus.ERROR,
								payload: payload
							})
						)
					})
				)
			})
		)
	)

	reorderCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoryGroupsActions.reordereffect),

			switchMap(({ props, previousIndex, currentIndex }) => {
				this.store.dispatch(
					CategoryGroupsNotSyncActions.changestatus({
						status: NotSyncStatus.SYNCHRONIZATION,
						payload: props
					})
				)

				console.log('data for reorder:', {
					categoryId: props._id,
					previousIndex,
					currentIndex
				})

				return this.api
					.reorderCategoryGroups({
						categoryGroupId: props._id,
						previousIndex,
						currentIndex
					})
					.pipe(
						switchMap(resultValue =>
							of(
								...resultValue.map(value => {
									if (value.categoryGroupId === props._id) {
										return CategoryGroupsSyncActions.add({
											payload: {
												...props,
												order: value.currentIndex,
												status: undefined,
												action: undefined
											}
										})
									}

									return CategoryGroupsSyncActions.orderupdate({
										payload: value
									})
								}),

								CategoryGroupsNotSyncActions.delete(props)
							)
						),
						catchError(() => {
							this.store.dispatch(
								CategoryGroupsNotSyncActions.changestatus({
									status: NotSyncStatus.ERROR,
									payload: props
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
