import { Category } from './Category'
import { Statistic, StatisticRequests } from './Statistic'
import { User } from './User'

// TODO: Using CategoryColorString
export type CategoriesBasicSet = Omit<Category, 'color' | 'order' | '_id'> & {
	color: string
}

export type AddStatisticInputs = Omit<StatisticRequests, '_id'>

export type InitializeSuccess = User
export type InitializeFailed = {
	authorized: false
}
