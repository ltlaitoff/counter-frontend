import { Component, EventEmitter, Input, Output } from '@angular/core'
import { sortedByOrder } from 'src/app/helpers'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import { HighlightPipe } from '../highlight.pipe'

@Component({
	selector: 'counter-category-select-dropdown',
	templateUrl: './category-select-dropdown.component.html',
	styleUrls: ['./category-select-dropdown.component.scss'],
	providers: [HighlightPipe]
})
export class CategorySelectDropdownComponent {
	@Input() categories: CategoryStateItemWithColor[] | null = null
	@Input() currentCategory: CategoryStateItemWithColor | null = null

	@Output() itemClick = new EventEmitter<string | null>()

	searchValue: string = ''

	get categoriesList() {
		if (!this.categories) return null

		const searchedCategories = this.categories.filter(item =>
			item.name
				.toLocaleLowerCase()
				.includes(this.searchValue.toLocaleLowerCase())
		)

		if (searchedCategories.length === 0) return null

		const categoriesSortedByOrder = sortedByOrder(searchedCategories)

		return categoriesSortedByOrder
	}

	onItemClick(id: string | null) {
		this.itemClick.emit(id)
	}
}
