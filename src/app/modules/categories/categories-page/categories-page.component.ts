import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Color } from 'src/types/Color'
import { Store } from '@ngrx/store'
import { RootState } from 'src/app/store'
import { selectColors } from 'src/app/store/colors'
import { CategoriesActions } from 'src/app/store/categories'
import { selectCategoriesState } from 'src/app/store/categories/categories.select'
import { LoadStatus } from 'src/app/store/store.types'
import { sortedByOrder } from '../../../helpers/sorted-by-order.helper'

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
	templateUrl: './categories-page.component.html',
	styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
	colors: Color[] | null = null

	currentStatus: LoadStatus = LoadStatus.NOT_SYNCHRONIZED

	addForm = new FormGroup({
		name: new FormControl<string>(''),
		comment: new FormControl<string>(''),
		color: new FormControl<string | null>(null)
	})

	public isAddFormOpened = false

	ngOnInit() {
		this.store.select(selectColors).subscribe(newColors => {
			this.colors = newColors
		})

		this.store.select(selectCategoriesState).subscribe(value => {
			this.currentStatus = value
		})
	}

	toggleAddForm() {
		this.isAddFormOpened = !this.isAddFormOpened
	}

	closeAddForm() {
		this.isAddFormOpened = false
		this.addForm.reset()
	}

	closeWithCheck() {
		if (!this.isAddFormOpened) return

		this.closeAddForm()
	}

	reloadCategories(force: boolean) {
		this.store.dispatch(CategoriesActions.load({ force: force }))
	}

	get sortedByOrderColors() {
		return sortedByOrder(this.colors)
	}

	onSubmitAddForm() {
		const valueForSend = this.prepareSubmitData(this.addForm.value)

		if (valueForSend == null) {
			return
		}

		this.store.dispatch(CategoriesActions.add(valueForSend))

		this.addForm.reset()
		this.closeAddForm()
	}

	private prepareSubmitData(value: typeof this.addForm.value) {
		if (!value.name || value.comment == null || !value.color) {
			return null
		}

		const valueForSend = {
			name: value.name,
			comment: value.comment,
			color: value.color
		}

		return valueForSend
	}

	constructor(private store: Store<RootState>) {}
}
