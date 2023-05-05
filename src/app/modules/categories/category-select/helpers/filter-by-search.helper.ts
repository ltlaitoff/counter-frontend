import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'

export function filterCategoriesBySearch(
	categories: CategoryStateItemWithColor[] | null,
	search: string
) {
	if (!categories) return null

	if (search.length === 0) return categories

	const searchLowered = search.toLocaleLowerCase()

	const searchedCategories = categories.filter(category =>
		category.name.toLocaleLowerCase().includes(searchLowered)
	)

	if (searchedCategories.length === 0) return null

	return searchedCategories
}
