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
	categoryGroupsForOutput: Record<
		string,
		CategoryGroupsStateItemWithColor & { opened: boolean }
	> = {}
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

		this.categoryGroupsForOutput = sortedCategoryGroups.reduce(
			(
				acc: Record<
					string,
					CategoryGroupsStateItemWithColor & { opened: boolean }
				>,
				categoryGroup
			) => {
				return {
					...acc,
					[categoryGroup._id]: { ...categoryGroup, opened: false }
				}
			},
			{}
		)
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

	get testGroups() {
		console.log('first')

		const finalResult: Record<string, CategoryStateItemWithColor[]> =
			Object.fromEntries(
				Object.entries(this.categoriesAndGroupsForOutput)
					.map(([key, value]) => {
						const searchedCategories = filterCategoriesBySearch(
							value,
							this.searchValue
						)

						return [key, searchedCategories]
					})
					.filter(([key, value]) => {
						return value !== null
					})
			)

		console.log(finalResult)

		return finalResult
	}

	toggleGroupOpened(
		group: CategoryGroupsStateItemWithColor & { opened: boolean }
	) {
		group.opened = !group.opened
	}

	onItemClick(value: string | null) {
		this.onSubmit.emit(value)
	}
}
