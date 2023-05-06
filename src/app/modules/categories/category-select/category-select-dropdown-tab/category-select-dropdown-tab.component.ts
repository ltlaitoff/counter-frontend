import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CategorySelectTab } from '../category-select.types'

@Component({
	selector: 'counter-category-select-dropdown-tab',
	templateUrl: './category-select-dropdown-tab.component.html',
	styleUrls: ['./category-select-dropdown-tab.component.scss']
})
export class CategorySelectDropdownTabComponent {
	@Input() tab: CategorySelectTab = 'category'
	@Input() active: boolean = false

	@Output() onClick = new EventEmitter<CategorySelectTab>()

	onClickInner() {
		this.onClick.emit(this.tab)
	}
}
