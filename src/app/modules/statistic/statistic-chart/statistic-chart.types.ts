import { Mode } from '../statistic.types'

export type ChartDataset = {
	id: string
	name: string
	data: Array<any>
	colorHEX: string
	mode: Mode
}
