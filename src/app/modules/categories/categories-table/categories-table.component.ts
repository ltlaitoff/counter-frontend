import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { sortedByOrder } from 'src/app/helpers'
import { RootState } from 'src/app/store'
import { selectCategories, CategoriesActions } from 'src/app/store/categories'
import { CategoryStateItem } from 'src/app/store/categories/categories.types'

@Component({
	selector: 'counter-categories-table',
	templateUrl: './categories-table.component.html',
	styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit {
	categories: CategoryStateItem[] | null = null

	ngOnInit() {
		this.store.select(selectCategories).subscribe(value => {
			this.categories = value
		})
	}

	get sortedByOrderCategories() {
		return sortedByOrder(this.categories)
	}

	deleteCategory(category: CategoryStateItem) {
		this.store.dispatch(CategoriesActions.delete(category))
	}

	constructor(private store: Store<RootState>) {}
}
