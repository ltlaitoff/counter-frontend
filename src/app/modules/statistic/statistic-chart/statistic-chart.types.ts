export type ChartDataInterval = 'day' | 'record'
export type ChartDataBy = 'category' | 'group'
export type ChartDataCategoryMode = 'time' | 'number' | 'all'

export type ChartDataset = {
	id: string
	name: string
	data: Array<any>
	colorHEX: string
}
