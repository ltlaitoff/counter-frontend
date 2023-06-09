import {
	ChartInterval,
	ChartBy,
	Mode,
	DateControl,
	Comment
} from '../statistic.types'

export type InitialControls = {
	'chart-interval': ChartInterval
	'chart-by': ChartBy
	categories: string[]
	mode: Mode
	comment: Comment
	date: DateControl
}

export const INITIAL_CONTROLS: InitialControls = {
	'chart-interval': 'day',
	'chart-by': 'category',
	mode: 'all',
	categories: [],
	comment: 'all',
	date: 'all'
}
