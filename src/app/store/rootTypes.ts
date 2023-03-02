import { ColorState } from './colors'
import { CategoriesState } from './categories'
import { StatisticState } from './statistic'

export interface RootState {
	colors: ColorState
	categories: CategoriesState
	statistic: StatisticState
}
