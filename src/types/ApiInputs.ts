import { Category } from './Category'
import { Statistic } from './Statistic'
import { User } from './User'

export type AddCategoryInputs = Omit<Category, 'color' | 'order' | '_id'> & {
	color: string
}

export type AddStatisticInputs = Omit<Statistic, 'category' | 'date'> & {
	category: string
	date: number
}

export type InitializeSuccess = User
export type InitializeFailed = {
	authorized: false
}
