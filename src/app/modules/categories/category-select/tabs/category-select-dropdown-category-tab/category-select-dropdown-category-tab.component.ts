import { Component, EventEmitter, Input, Output } from '@angular/core'
import { sortedByOrder } from 'src/app/helpers'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import { filterCategoriesBySearch } from '../../helpers/filter-by-search.helper'

@Component({
	selector: 'counter-category-select-dropdown-category-tab',
	templateUrl: './category-select-dropdown-category-tab.component.html'
})
export class CategorySelectDropdownCategoryTabComponent {
	@Input() categories: CategoryStateItemWithColor[] = []
	@Input() currentCategory: CategoryStateItemWithColor | null = null
	@Input() searchValue: string = ''

	@Output() onSubmit = new EventEmitter<string | null>()

	get categoriesList() {
		const searchedCategories = filterCategoriesBySearch(
			this.categories,
			this.searchValue
		)

		if (!searchedCategories) return null

		return sortedByOrder(searchedCategories)
	}

	onItemClick(value: string | null) {
		this.onSubmit.emit(value)
	}
}
