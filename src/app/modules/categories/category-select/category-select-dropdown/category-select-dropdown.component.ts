import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CategoryStateItem } from 'src/app/store/categories/categories.types'

@Component({
	selector: 'counter-category-select-dropdown',
	templateUrl: './category-select-dropdown.component.html',
	styleUrls: ['./category-select-dropdown.component.scss']
})
export class CategorySelectDropdownComponent {
	@Input() categories: CategoryStateItem[] | null = null
	@Input() currentCategory: CategoryStateItem | null = null

	@Output() itemClick = new EventEmitter<string>()

	onItemClick(id: string) {
		this.itemClick.emit(id)
	}
}
