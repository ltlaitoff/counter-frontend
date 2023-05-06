import { CategoriesEffects } from './categories/categories.effects'
import { CategoryGroupsEffects } from './category-groups/category-groups.effects'
import { ColorEffects } from './colors/colors.effects'
import { StatisticEffects } from './statistic/statistic.effects'

const effects = [
	ColorEffects,
	CategoriesEffects,
	StatisticEffects,
	CategoryGroupsEffects
]

export default effects
