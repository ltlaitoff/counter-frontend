import { ColorState } from './colors'
import { CategoriesState } from './categories'

export interface RootState {
	colors: ColorState
	categories: CategoriesState
}
