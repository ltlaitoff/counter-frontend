import { Category } from './Category'
import { Statistic } from './Statistic'
import { User } from './User'
import { CategoryGroup } from './CategoryGroup'

// TODO: Using CategoryColorString
export type CategoriesBasicSet = Omit<Category, 'color' | 'order' | '_id'> & {
	color: string
}

export type AddStatisticInputs = Omit<Statistic, '_id'>

export type AddCategoryGroupInputs = Omit<CategoryGroup, '_id'>

export type InitializeSuccess = User
export type InitializeFailed = {
	authorized: false
}

export interface ReorderCategoryData {
	categoryId: string
	previousIndex: number
	currentIndex: number
}

export type ReorderCategoryReturnData = ReorderCategoryData[]
