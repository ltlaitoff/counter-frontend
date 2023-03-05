import { createReducer, on } from '@ngrx/store'
import { ColorState } from '.'
import { colorsLoadedSuccess } from './colors.actions'

export const initialState: ColorState = []

export const colorsReducer = createReducer(
	initialState,
	on(colorsLoadedSuccess, (state, { payload }) => [...payload])
)
