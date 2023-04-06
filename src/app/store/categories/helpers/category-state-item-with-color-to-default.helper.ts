import {
	CategoryStateItemWithColor,
	CategoryStateItem
} from '../categories.types'

export function categoryStateItemWithColorToDefault(
	state: CategoryStateItemWithColor
): CategoryStateItem {
	return { ...state, color: state.color._id }
}
