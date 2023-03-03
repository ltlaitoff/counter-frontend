import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { EMPTY } from 'rxjs'
import { map, exhaustMap, catchError, withLatestFrom } from 'rxjs/operators'
import { ApiService } from 'src/app/services/api.service'
import { CategoriesActions } from '../categories'

import { RootState } from '../rootTypes'

@Injectable()
export class CategoriesEffects {
	loadCategories$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoriesActions.loadCategories),
			withLatestFrom(this.store.pipe(select('categories'))),
			exhaustMap(([params, categoriesValue]) => {
				if (categoriesValue.length === 0 || params.force) {
					return this.api.getAllCategories().pipe(
						map(value =>
							CategoriesActions.categoriesLoadedSuccess({ payload: value })
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
			ofType(CategoriesActions.addCategory),
			exhaustMap(category => {
				return this.api.addCategory(category).pipe(
					map(category => CategoriesActions.addCategorySuccess(category)),
					catchError(() => EMPTY)
				)
			})
		)
	)

	deleteCategory$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CategoriesActions.deleteCategory),
			exhaustMap(props => {
				return this.api.deleteCategory(props.id).pipe(
					map(() => CategoriesActions.deleteCategorySuccess(props)),
					catchError(() => EMPTY)
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
