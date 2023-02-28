import { Category } from './Category'

export type AddCategoryInputs = Omit<Category, 'color' | 'order' | '_id'> & {
	color: string
}
