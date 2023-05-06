import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { RootState } from 'src/app/store'
import { CategoriesActions } from 'src/app/store/categories'
import { CategoriesBasicSet } from 'src/types/ApiInputs'

@Component({
	selector: 'counter-category-select-dropdown-footer',
	templateUrl: './category-select-dropdown-footer.component.html'
})
export class CategorySelectDropdownFooterComponent {
	constructor(private store: Store<RootState>) {}

	isAddFormOpened: boolean = false

	toggleAddForm() {
		this.isAddFormOpened = !this.isAddFormOpened
	}

	closeAddForm() {
		this.isAddFormOpened = false
	}

	addNewCategory(data: CategoriesBasicSet) {
		this.store.dispatch(CategoriesActions.add(data))
		this.closeAddForm()
	}
}
