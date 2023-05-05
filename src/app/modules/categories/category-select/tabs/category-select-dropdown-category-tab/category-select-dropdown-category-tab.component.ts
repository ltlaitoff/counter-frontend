import { Component, EventEmitter, Input, Output } from '@angular/core'
import { sortedByOrder } from 'src/app/helpers'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'

@Component({
	selector: 'counter-category-select-dropdown-category-tab',
	templateUrl: './category-select-dropdown-category-tab.component.html',
	styleUrls: ['./category-select-dropdown-category-tab.component.scss']
})
export class CategorySelectDropdownCategoryTabComponent {
	@Input() categories: CategoryStateItemWithColor[] = []
	@Input() currentCategory: CategoryStateItemWithColor | null = null
	@Input() searchValue: string = ''

	@Output() onSubmit = new EventEmitter<string | null>()

	get categoriesList() {
		return this.filterBySearchAndSorting(this.categories)
	}

	private filterBySearchAndSorting(value: CategoryStateItemWithColor[] | null) {
		if (!value) return null

		const searchedCategories = value.filter(item =>
			item.name
				.toLocaleLowerCase()
				.includes(this.searchValue.toLocaleLowerCase())
		)

		if (searchedCategories.length === 0) return null

		const categoriesSortedByOrder = sortedByOrder(searchedCategories)

		return categoriesSortedByOrder
	}

	onItemClick(value: string | null) {
		this.onSubmit.emit(value)
	}
}
