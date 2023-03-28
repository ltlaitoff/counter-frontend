import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

import { RootState } from 'src/app/store'
import { CategoriesActions } from 'src/app/store/categories'
import { selectCategoriesState } from 'src/app/store/categories/categories.select'
import { LoadStatus } from 'src/app/store/store.types'

/*
TODO [x]: View as table with orde
TODO [x]: Add new category
TODO [x]: Delete category (idk what do with statistic.. -.-)
			Возле поля таблицы должна появляться кнопка удаления(вообще это будет набор кнопок) при нажатии на которую всплывёт модалка где нужно будет подтвердить удаление
TODO [ ]: Change category info
			При клике на текстовое поле появится инпут на его месте в который можно будет вписать новое значение, после закрытия инпута запрос в api на изменение
			При клике на цвет - на его месте появляется открытый select color
TODO [ ]: Drag-n-drop order
*/

@Component({
	selector: 'counter-categories-page',
	templateUrl: './categories-page.component.html'
})
export class CategoriesPageComponent implements OnInit {
	currentStatus: LoadStatus = LoadStatus.NOT_SYNCHRONIZED

	public isAddFormOpened = false

	ngOnInit() {
		this.store.select(selectCategoriesState).subscribe(value => {
			this.currentStatus = value
		})
	}

	toggleAddForm() {
		this.isAddFormOpened = !this.isAddFormOpened
	}

	closeAddForm() {
		this.isAddFormOpened = false
	}

	closeWithCheck() {
		if (!this.isAddFormOpened) return

		this.closeAddForm()
	}

	reloadCategories(force: boolean) {
		this.store.dispatch(CategoriesActions.load({ force: force }))
	}

	constructor(private store: Store<RootState>) {}
}
