import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output
} from '@angular/core'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import { CategoryGroupsStateItemWithColor } from 'src/app/store/category-groups/category-groups.types'
import { CategorySelectTab } from './category-select-dropdown.types'
import {
	TABS_DEFAULT,
	ACTIVE_TAB_DEFAULT
} from './category-select-dropdown.config'

@Component({
	selector: 'counter-category-select-dropdown',
	templateUrl: './category-select-dropdown.component.html',
	styleUrls: ['./category-select-dropdown.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategorySelectDropdownComponent {
	@Input() categories: CategoryStateItemWithColor[] | null = null
	@Input() categoryGroups: CategoryGroupsStateItemWithColor[] | null = null
	@Input() currentCategory: string | string[] | null = null

	@Output() itemClick = new EventEmitter<string | null>()

	searchValue: string = ''
	tabs: CategorySelectTab[] = TABS_DEFAULT
	activeTab: CategorySelectTab = ACTIVE_TAB_DEFAULT
	isAddFormOpened: boolean = false

	onItemClick(id: string | null) {
		this.itemClick.emit(id)
	}

	setActiveTab(newActiveTab: CategorySelectTab) {
		this.activeTab = newActiveTab
	}

	stopPropagination(event: Event) {
		this.isAddFormOpened = false

		event.stopPropagation()
	}
}
