import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { EMPTY } from 'rxjs'
import { map, exhaustMap, catchError, withLatestFrom } from 'rxjs/operators'
import { ApiService } from 'src/app/services/api.service'

import { ColorsActions } from '.'
import { RootState } from '../rootTypes'

@Injectable()
export class ColorEffects {
	loadColors$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ColorsActions.loadColors),
			withLatestFrom(this.store.pipe(select('colors'))),
			exhaustMap(([params, colorsValue]) => {
				if (colorsValue.length === 0 || params.force) {
					return this.api.getAllColors().pipe(
						map(colors =>
							ColorsActions.colorsLoadedSuccess({ payload: colors })
						),
						catchError(() => EMPTY)
					)
				}

				return EMPTY
			})
		)
	)

	constructor(
		private actions$: Actions,
		private api: ApiService,
		private store: Store<RootState>
	) {}
}
