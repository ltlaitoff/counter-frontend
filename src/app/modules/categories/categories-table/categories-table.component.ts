import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { sortedByOrder } from 'src/app/helpers'
import { RootState } from 'src/app/store'
import { selectCategories, CategoriesActions } from 'src/app/store/categories'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'

@Component({
	selector: 'counter-categories-table',
	templateUrl: './categories-table.component.html',
	styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {
	categories: CategoryStateItemWithColor[] | null = null
	editCategoryId: string | null = null

	ngOnInit() {
		this.store.select(selectCategories).subscribe(value => {
			this.categories = value
		})
	}

	get sortedByOrderCategories() {
		return sortedByOrder(this.categories)
	}

	deleteCategory(category: CategoryStateItemWithColor) {
		this.store.dispatch(CategoriesActions.delete(category))
	}

	editCategoryStatus(category: CategoryStateItemWithColor) {
		if (this.editCategoryId === null) {
			this.editCategoryId = category._id
			return
		}

		this.editCategoryId = null
	}

	editCategory(currentValue: CategoryStateItemWithColor, editedValue: any) {
		this.editCategoryId = null

		this.store.dispatch(
			CategoriesActions.update({
				oldCategory: currentValue,
				dataForUpdate: editedValue
			})
		)
	}

	closeCategoryEdit() {
		if (this.editCategoryId !== null) {
			this.editCategoryId = null
		}
	}

	constructor(private store: Store<RootState>) {}
}
