import { Component, EventEmitter, Input, Output } from '@angular/core'
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

	@Input() isAddFormOpened: boolean = false
	@Output() isAddFormOpenedChange = new EventEmitter<boolean>()

	toggleAddForm(event: Event) {
		event.stopPropagation()

		this.isAddFormOpened = !this.isAddFormOpened

		this.isAddFormOpenedChange.emit(this.isAddFormOpened)
	}

	closeAddForm() {
		this.isAddFormOpened = false

		this.isAddFormOpenedChange.emit(this.isAddFormOpened)
	}

	addNewCategory(data: CategoriesBasicSet) {
		this.store.dispatch(CategoriesActions.add(data))
		this.closeAddForm()
	}

	stopPropagination(e: Event) {
		e.stopPropagation()
	}
}
