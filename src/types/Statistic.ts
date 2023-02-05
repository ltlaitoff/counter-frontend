import { Category } from './Category'

export interface Statistic {
	_id?: string
	date: Date
	count: number
	comment: string
	category: Category
	summ: number
}
