import { Category } from './Category'
import { Statistic, StatisticRequests } from './Statistic'
import { User } from './User'

// TODO: Using CategoryColorString
export type AddCategoryInputs = Omit<Category, 'color' | 'order' | '_id'> & {
	color: string
}

export type AddStatisticInputs = StatisticRequests

export type InitializeSuccess = User
export type InitializeFailed = {
	authorized: false
}
