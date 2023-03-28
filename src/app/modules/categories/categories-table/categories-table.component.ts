import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { sortedByOrder } from 'src/app/helpers'
import { RootState } from 'src/app/store'
import { selectCategories, CategoriesActions } from 'src/app/store/categories'
import { CategoryStateItem } from 'src/app/store/categories/categories.types'
import { Status } from 'src/app/store/categories/not-sync/categories-not-sync.types'

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

	checkStatusIs(
		status: Status | undefined,
		value: 'not-synchronized' | 'synchronization' | 'error'
	) {
		if (!status) return

		switch (value) {
			case 'not-synchronized':
				return status === Status.NOT_SYNCHRONIZED

			case 'synchronization':
				return status === Status.SYNCHRONIZATION

			case 'error':
				return status === Status.ERROR
		}
	}

	constructor(private store: Store<RootState>) {}
}
