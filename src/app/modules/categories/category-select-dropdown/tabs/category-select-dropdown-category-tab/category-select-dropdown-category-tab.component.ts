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
	@Input() currentCategory: string | string[] | null = null
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

	checkIsItemChoised(id: string) {
		if (this.currentCategory === null) return false

		if (this.currentCategory instanceof Array) {
			return this.currentCategory.reduce((acc, item) => {
				return acc || item === id
			}, false)
		}

		return this.currentCategory === id
	}

	get isMulti() {
		return this.currentCategory instanceof Array
	}
}
