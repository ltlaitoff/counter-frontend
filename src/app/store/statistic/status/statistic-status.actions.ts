import { createActionGroup, props } from '@ngrx/store'
import { StatisticStatusTypes } from '.'

export const StatisticStatusActions = createActionGroup({
	source: 'Statistic status',
	events: {
		set: props<{ status: StatisticStatusTypes.StatusState }>()
	}
})
