import { Category } from './Category'

export interface Statistic {
	_id?: string
	date: string // Date as ISO string
	count: number
	comment: string
	category: Category
	summ: number
}
