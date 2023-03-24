import { StatisticTypes } from '../..'

export const statisticDefaultToStatisticNotSync = (
	statistic: StatisticTypes.NotSyncTypes.StateItemWithDefaultStatistic
): StatisticTypes.NotSyncTypes.StateItem => {
	return {
		...statistic,
		category: statistic.category._id,
		date: new Date(statistic.date).getTime()
	}
}
