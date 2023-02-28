import { createAction, props } from '@ngrx/store'
import { Color } from 'src/types/Color'

const TAG = '[API Colors]'

export const loadColors = createAction(
	`${TAG} Load Colors`,
	(props: { force: boolean } = { force: false }) => props
)

export const colorsLoadedSuccess = createAction(
	`${TAG} Colors Loaded Success`,
	props<{ payload: Color[] }>()
)

export const colorsLoadedError = createAction(`${TAG} Colors Loaded Error`)
