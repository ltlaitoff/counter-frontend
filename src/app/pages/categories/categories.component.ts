import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { Category } from '../../../types/Category'
import { FormControl, FormGroup } from '@angular/forms'
import { Color } from 'src/types/Color'
import { Store } from '@ngrx/store'
import { RootState } from 'src/app/store'
import { ColorsActions, selectColors } from 'src/app/store/colors'
import { CategoriesActions } from 'src/app/store/categories'
import { selectCategories } from '../../store/categories/categories.select'
import { ActivatedRoute } from '@angular/router'

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
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
	categories: Category[] | null = null
	colors: Color[] | null = null

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

		this.store.select(selectCategories).subscribe(value => {
			this.categories = value
		})
	}

	toggleAddForm() {
		this.isAddFormOpened = !this.isAddFormOpened
	}

	closeAddForm() {
		this.isAddFormOpened = false
	}

	reloadCategories() {
		this.store.dispatch(CategoriesActions.load({ force: true }))
	}

	deleteCategory(category: Category) {
		this.store.dispatch(CategoriesActions.delete(category))
	}

	sortedByOrder<T extends { order: number }>(
		array: Array<T> | null
	): Array<T> | null {
		if (!array) return null

		return [...array].sort((a, b) => {
			return a.order > b.order ? 1 : -1
		})
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
