import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { sortedByOrder } from 'src/app/helpers'
import { CategoriesActions } from 'src/app/store/categories'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import { CategoriesBasicSet } from 'src/types/ApiInputs'
import { RootState } from '../../../../store/rootTypes'
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

	constructor(private store: Store<RootState>) {}

	onItemClick(id: string | null) {
		this.itemClick.emit(id)
	}

	/* Add form */
	isAddFormOpened: boolean = false

	closeAddFormWithCheck() {
		if (!this.isAddFormOpened) return

		this.closeAddForm()
	}

	toggleAddForm() {
		this.isAddFormOpened = !this.isAddFormOpened
	}

	closeAddForm() {
		this.isAddFormOpened = false
	}

	addNewCategory(data: CategoriesBasicSet) {
		this.store.dispatch(CategoriesActions.add(data))
		this.closeAddFormWithCheck()
	}
}
