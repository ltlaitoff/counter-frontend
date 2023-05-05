import { KeyValue } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { sortedByOrder } from 'src/app/helpers'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import { CategoryGroupsStateItemWithColor } from 'src/app/store/category-groups/category-groups.types'

@Component({
	selector: 'counter-category-select-dropdown-group-tab',
	templateUrl: './category-select-dropdown-group-tab.component.html'
})
export class CategorySelectDropdownGroupTabComponent implements OnInit {
	@Input() categories: CategoryStateItemWithColor[] = []
	@Input() categoryGroups: CategoryGroupsStateItemWithColor[] = []
	@Input() currentCategory: CategoryStateItemWithColor | null = null
	@Input() searchValue: string = ''

	@Output() onSubmit = new EventEmitter<string | null>()

	categoriesAndGroupsForOutput: Record<string, CategoryStateItemWithColor[]> =
		{}
	categoryGroupsLocal: Record<
		string,
		CategoryGroupsStateItemWithColor & { opened: boolean }
	> = {}

	mySortingFunction(
		a: KeyValue<string, CategoryStateItemWithColor[]>,
		b: KeyValue<string, CategoryStateItemWithColor[]>
	): number {
		return b.key.length - a.key.length
	}

	ngOnInit() {
		console.log('ngOnInit')

		this.transformCategoriesAndGroupsForOutput()
		this.setCategoryGroupsLocal()
	}

	ngOnChanges() {
		console.log('ngOnChanges')

		this.transformCategoriesAndGroupsForOutput()
		this.setCategoryGroupsLocal()
	}

	setCategoryGroupsLocal() {
		console.log(
			'🚀 ~ file: category-select-dropdown.component.ts:73 ~ CategorySelectDropdownComponent ~ setCategoryGroupsLocal ~ setCategoryGroupsLocal'
		)

		if (!this.categoryGroups) return

		this.categoryGroupsLocal = this.categoryGroups.reduce(
			(
				acc: Record<
					string,
					CategoryGroupsStateItemWithColor & { opened: boolean }
				>,
				item
			) => {
				acc[item._id] = { ...item, opened: false }

				return acc
			},
			{}
		)
	}

	transformCategoriesAndGroupsForOutput() {
		console.log('transformCategoriesAndGroupsForOutput')

		const result: Record<string, CategoryStateItemWithColor[]> = {}

		this.categories?.forEach(category => {
			if (category.group.length === 0) {
				const currentCategoriesInResult = result[''] || []

				result[''] = [...currentCategoriesInResult, category]
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
						return [key, this.filterBySearchAndSorting(value)]
					})
					.filter(([key, value]) => {
						return value !== null
					})
			)

		return finalResult
	}

	toggleGroupOpened(
		group: CategoryGroupsStateItemWithColor & { opened: boolean }
	) {
		group.opened = !group.opened
	}

	private filterBySearchAndSorting(value: CategoryStateItemWithColor[] | null) {
		if (!value) return null

		const searchedCategories = value.filter(item =>
			item.name
				.toLocaleLowerCase()
				.includes(this.searchValue.toLocaleLowerCase())
		)

		if (searchedCategories.length === 0) return null

		const categoriesSortedByOrder = sortedByOrder(searchedCategories)

		return categoriesSortedByOrder
	}

	onItemClick(value: string | null) {
		this.onSubmit.emit(value)
	}
}
