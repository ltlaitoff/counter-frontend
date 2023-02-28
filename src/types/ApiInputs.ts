import { Category } from './Category'
import { Statistic } from './Statistic'

export type AddCategoryInputs = Omit<Category, 'color' | 'order' | '_id'> & {
	color: string
}

export type AddStatisticInputs = Omit<Statistic, 'category' | 'date'> & {
	category: string
	date: number
}
