import { Color } from './Color'

export interface Category {
	_id: string
	name: string
	comment: string
	color: Color
	order: number
}
