import {
	CategoryGroupsStateItemWithColor,
	CategoryGroupsStateItem
} from '../category-groups.types'

export function categoryStateItemWithColorToDefault(
	state: CategoryGroupsStateItemWithColor
): CategoryGroupsStateItem {
	return { ...state, color: state.color._id }
}
