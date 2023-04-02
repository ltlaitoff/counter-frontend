import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { CategoriesActions } from 'src/app/store/categories'
import { CategoryStateItem } from 'src/app/store/categories/categories.types'
import { CategoriesBasicSet } from 'src/types/ApiInputs'
import { RootState } from '../../../../store/rootTypes'

@Component({
	selector: 'counter-category-select-dropdown',
	templateUrl: './category-select-dropdown.component.html',
	styleUrls: ['./category-select-dropdown.component.scss']
})
export class CategorySelectDropdownComponent {
	@Input() categories: CategoryStateItem[] | null = null
	@Input() currentCategory: CategoryStateItem | null = null

	@Output() itemClick = new EventEmitter<string>()

	constructor(private store: Store<RootState>) {}

	onItemClick(id: string) {
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
