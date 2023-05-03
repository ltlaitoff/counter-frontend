import {
	CdkDragDrop,
	CdkDragEnd,
	CdkDragStart,
	moveItemInArray
} from '@angular/cdk/drag-drop'
import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { sortedByOrder } from 'src/app/helpers'
import { RootState } from 'src/app/store'
import { selectCategories, CategoriesActions } from 'src/app/store/categories'
import {
	CategoryStateItemWithColor,
	CategorySyncStateItemWithColor
} from 'src/app/store/categories/categories.types'
import { selectCategoryGroups } from 'src/app/store/category-groups/category-groups.select'
import { CategoryGroupsStateItemWithColor } from 'src/app/store/category-groups/category-groups.types'

@Component({
	selector: 'counter-categories-table',
	templateUrl: './categories-table.component.html',
	styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {
	categories: CategoryStateItemWithColor[] | null = null
	showMenu: string | null = null
	editCategoryId: string | null = null
	allCategoryGroups: CategoryGroupsStateItemWithColor[] = []

	ngOnInit() {
		this.store.select(selectCategories).subscribe(value => {
			if (JSON.stringify(value) !== JSON.stringify(this.categories)) {
				this.categories = value
			}
		})

		this.store.select(selectCategoryGroups).subscribe(value => {
			if (JSON.stringify(value) !== JSON.stringify(this.allCategoryGroups)) {
				this.allCategoryGroups = value
			}
		})
	}

	get sortedByOrderCategories() {
		return sortedByOrder(this.categories)
	}

	drop(
		event: CdkDragDrop<
			CategorySyncStateItemWithColor[],
			CategorySyncStateItemWithColor[],
			CategorySyncStateItemWithColor
		>
	) {
		if (this.sortedByOrderCategories === null) return
		if (event.previousIndex === event.currentIndex) return

		const categoryData = event.item.data
		const previousIndex = categoryData.order
		const currentIndex = this.sortedByOrderCategories[event.currentIndex].order

		this.store.dispatch(
			CategoriesActions.reorder({
				category: categoryData,
				previousIndex: previousIndex,
				currentIndex: currentIndex
			})
		)
	}

	onControlButtonClick(categoryId: string) {
		console.log('onControlButtonClick')

		if (this.showMenu === null || this.showMenu !== categoryId) {
			this.showMenu = categoryId
			return
		}

		this.showMenu = null
	}

	onFormClickedOutside(event: any, categoryId: string) {
		if (this.showMenu !== categoryId) {
			return
		}

		this.showMenu = null
		this.editCategoryId = null
	}

	editCategory(currentValue: CategoryStateItemWithColor, editedValue: any) {
		this.editCategoryId = null
		this.showMenu = null

		this.store.dispatch(
			CategoriesActions.update({
				oldCategory: currentValue,
				dataForUpdate: editedValue
			})
		)
	}

	setEditCategoryId(newId: string) {
		if (this.editCategoryId === newId) {
			this.editCategoryId = null
			return
		}

		this.editCategoryId = newId
	}

	deleteCategory(category: CategoryStateItemWithColor) {
		this.store.dispatch(CategoriesActions.delete(category))
	}

	changeCategoryGroups(
		category: CategoryStateItemWithColor,
		categoryGroups: any
	) {
		this.store.dispatch(
			CategoriesActions.update({
				oldCategory: category,
				dataForUpdate: {
					...category,
					color: category.color._id,
					group: categoryGroups
				}
			})
		)
	}

	constructor(private store: Store<RootState>) {}
}
