import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output
} from '@angular/core'
import { sortedByOrder } from 'src/app/helpers'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import { CategoryGroupsStateItemWithColor } from 'src/app/store/category-groups/category-groups.types'
import { filterCategoriesBySearch } from '../../helpers/filter-by-search.helper'

@Component({
	selector: 'counter-category-select-dropdown-group-tab',
	templateUrl: './category-select-dropdown-group-tab.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategorySelectDropdownGroupTabComponent implements OnInit {
	@Input() categories: CategoryStateItemWithColor[] = []
	@Input() categoryGroups: CategoryGroupsStateItemWithColor[] = []
	@Input() currentCategory: CategoryStateItemWithColor | null = null
	@Input() searchValue: string = ''

	@Output() onSubmit = new EventEmitter<string | null>()

	categoriesAndGroupsForOutput: Record<string, CategoryStateItemWithColor[]> =
		{}
	openedGroupIds: string[] = []

	categoriesWithoutGroups: CategoryStateItemWithColor[] = []

	ngOnInit() {
		console.log('ngOnInit')

		this.transformCategoriesAndGroupsForOutput()
		this.setCategoryGroupsLocal()
	}

	setCategoryGroupsLocal() {
		if (!this.categoryGroups) return

		const sortedCategoryGroups = sortedByOrder(this.categoryGroups)

		if (!sortedCategoryGroups) return
	}

	transformCategoriesAndGroupsForOutput() {
		console.log('transformCategoriesAndGroupsForOutput')

		const result: Record<string, CategoryStateItemWithColor[]> = {}
		this.categoriesWithoutGroups = []

		this.categories?.forEach(category => {
			if (category.group.length === 0) {
				this.categoriesWithoutGroups.push(category)

				return
			}

			category.group.forEach(group => {
				const currentCategoriesInResult = result[group] || []

				result[group] = [...currentCategoriesInResult, category]
			})
		})

		this.categoriesAndGroupsForOutput = result
	}

	testGroups(id: string) {
		const value = this.categoriesAndGroupsForOutput[id]

		const searchedCategories = filterCategoriesBySearch(value, this.searchValue)

		if (filterCategoriesBySearch === null) return []

		return searchedCategories
	}

	toggleGroupOpened(group: CategoryGroupsStateItemWithColor) {
		if (!this.openedGroupIds.includes(group._id)) {
			this.openedGroupIds.push(group._id)

			return
		}

		this.openedGroupIds = this.openedGroupIds.filter(item => item !== group._id)
	}

	onItemClick(value: string | null) {
		this.onSubmit.emit(value)
	}
}
