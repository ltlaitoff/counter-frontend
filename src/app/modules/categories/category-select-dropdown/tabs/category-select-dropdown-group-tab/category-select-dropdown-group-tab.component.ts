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
	@Input() currentCategory: string | string[] | null = null
	@Input() searchValue: string = ''

	@Output() onSubmit = new EventEmitter<string | null>()

	categoriesAndGroupsForOutput: Record<string, CategoryStateItemWithColor[]> =
		{}

	openedGroupIds: string[] = []

	categoriesWithoutGroups: CategoryStateItemWithColor[] = []

	ngOnInit() {
		this.transformCategoriesAndGroupsForOutput()
	}

	get categoryGroupsForOutput() {
		const result = sortedByOrder(this.categoryGroups)

		if (result === null) {
			throw new Error('Something gonna wrong')
		}

		return result
	}

	get categoriesList() {
		const searchedCategories = filterCategoriesBySearch(
			this.categories,
			this.searchValue
		)

		if (!searchedCategories) return null

		return sortedByOrder(searchedCategories)
	}

	transformCategoriesAndGroupsForOutput() {
		this.categoriesAndGroupsForOutput = {}
		this.categoriesWithoutGroups = []

		sortedByOrder(this.categories)?.forEach(category => {
			if (category.group.length === 0) {
				this.categoriesWithoutGroups.push(category)

				return
			}

			category.group.forEach(groupId => {
				if (!this.categoriesAndGroupsForOutput[groupId]) {
					this.categoriesAndGroupsForOutput[groupId] = []
				}

				this.categoriesAndGroupsForOutput[groupId].push(category)
			})
		})
	}

	categoriesByGroupIdForOutput(groupId: string) {
		return filterCategoriesBySearch(
			this.categoriesAndGroupsForOutput[groupId],
			this.searchValue
		)
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

	checkIsItemChoised(id: string) {
		if (this.currentCategory === null) return false

		if (this.currentCategory instanceof Array) {
			return this.currentCategory.reduce((acc, item) => {
				return acc || item === id
			}, false)
		}

		return this.currentCategory === id
	}

	get isMulti() {
		return this.currentCategory instanceof Array
	}
}
