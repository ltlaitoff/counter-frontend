import { Component, EventEmitter, Output, Input } from '@angular/core'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import { HighlightPipe } from '../highlight.pipe'

@Component({
	selector: 'counter-category-select-dropdown-category-item',
	templateUrl: './category-select-dropdown-category-item.component.html',
	providers: [HighlightPipe]
})
export class CategorySelectDropdownCategoryItemComponent {
	@Input() category: CategoryStateItemWithColor | null = null
	@Input() choiced: boolean = false
	@Input() multi: boolean = false
	@Input() searchValue: string = ''

	@Output() itemClick = new EventEmitter<string | null>()

	onItemClick(id: string | null) {
		this.itemClick.emit(id)
	}
}
