import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { RootState } from 'src/app/store'
import { CategoriesActions } from 'src/app/store/categories'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'

/*
	Сделать одну кнопку которая будет отвечать на линию
	При наведении показывать 'drag for move, click for menu'
	Кнопка будет table-control
	Форма изменения/удаления будет отдельно и не должна зависить от кнопки

	То есть в кнопку нужно будет прокидывать click, canMove = false, и как-то cdkDrag
	Форма будет контролироваться с отдельно от кнопки
	Форма будет содержать 2 пункта меню: 
*/

@Component({
	selector: 'counter-categories-table-control',
	templateUrl: './categories-table-control.component.html',
	styleUrls: ['./categories-table-control.component.scss']
})
export class CategoriesTableControlComponent {
	@Input() category: CategoryStateItemWithColor | null = null

	editCategoryId: string | null = null

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
