import { KeyValue } from '@angular/common'
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
import { HighlightPipe } from '../highlight.pipe'

@Component({
	selector: 'counter-category-select-dropdown',
	templateUrl: './category-select-dropdown.component.html',
	styleUrls: ['./category-select-dropdown.component.scss'],
	providers: [HighlightPipe],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategorySelectDropdownComponent implements OnInit {
	@Input() categories: CategoryStateItemWithColor[] | null = null
	@Input() categoryGroups: CategoryGroupsStateItemWithColor[] | null = null
	@Input() currentCategory: CategoryStateItemWithColor | null = null

	@Output() itemClick = new EventEmitter<string | null>()

	searchValue: string = ''

	activeTab: 'category' | 'group' = 'category'

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

	get categoriesList() {
		return this.filterBySearchAndSorting(this.categories)
	}

	onItemClick(id: string | null) {
		this.itemClick.emit(id)
	}

	setActiveTab(newActiveTab: 'category' | 'group') {
		this.activeTab = newActiveTab
	}

	stopPropagination(event: Event) {
		event.stopPropagation()
	}
}
