import { createAction, props } from '@ngrx/store'
import { AddStatisticInputs } from 'src/types/ApiInputs'
import { Statistic } from 'src/types/Statistic'

const TAG = '[API Statistic]'

/* Load */
export const loadStatistic = createAction(
	`${TAG} Load Statistic`,
	(props: { force: boolean } = { force: false }) => props
)

export const loadStatisticSuccess = createAction(
	`${TAG} Statistic Loaded Success`,
	props<{ payload: Statistic[] }>()
)

export const statisticLoadedError = createAction(
	`${TAG} Statistic Loaded Error`
)

/* Add */
export const addStatistic = createAction(
	`${TAG} Add new Statistic record`,
	(statistic: AddStatisticInputs) => statistic
)

export const addStatisticSuccess = createAction(
	`${TAG} Add new Statistic record success`,
	(statistic: Statistic) => statistic
)

// /* Delete */
export const deleteStatistic = createAction(
	`${TAG} Delete new Statistic`,
	(statistic: Statistic) => statistic
)

export const deleteStatisticSuccess = createAction(
	`${TAG} Delete Statistic success`,
	(statistic: Statistic) => statistic
)
