import { Color } from './Color'

export interface Category {
	_id: string
	name: string
	comment: string
	color: Color
	order: number
}

export type CategoryColorString = Omit<Category, 'color'> & {
	color: string
}
