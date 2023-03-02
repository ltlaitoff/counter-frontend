import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { EMPTY } from 'rxjs'
import { map, exhaustMap, catchError, withLatestFrom } from 'rxjs/operators'
import { ApiService } from 'src/app/services/api.service'
import { StatisticActions } from '.'

import { RootState } from '../rootTypes'

@Injectable()
export class StatisticEffects {
	loadStatistic$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StatisticActions.loadStatistic),
			withLatestFrom(this.store.pipe(select('statistic'))),
			exhaustMap(([params, statisticValue]) => {
				if (statisticValue.length === 0 || params.force) {
					return this.api.getAllStatisticRecords().pipe(
						map(value =>
							StatisticActions.loadStatisticSuccess({ payload: value })
						),
						catchError(() => EMPTY)
					)
				}

				return EMPTY
			})
		)
	)

	addStatisticRecord$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StatisticActions.addStatistic),
			exhaustMap(statistic => {
				return this.api.addStatisticRecord(statistic).pipe(
					map(newStatistic =>
						StatisticActions.addStatisticSuccess(newStatistic)
					),
					catchError(() => EMPTY)
				)
			})
		)
	)

	// deleteCategory$ = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(StatisticAcaddStatisticRecorddeleteCategory(props.id).pipe(
	// 				map(() => StatisticActions.deleteCategorySuccess(props)),
	// 				catchError(() => EMPTY)
	// 			)
	// 		})
	// 	)
	// )

	constructor(
		private actions$: Actions,
		private api: ApiService,
		private store: Store<RootState>
	) {}
}
