export interface Category {
	_id: string
	name: string
	comment: string
	color: string
	order: number
	dimension?: string
	group: string[]
}
