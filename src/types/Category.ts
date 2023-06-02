export interface Category {
	_id: string
	name: string
	mode: 'number' | 'time'
	comment: string
	color: string
	order: number
	dimension?: string
	group: string[]
}
