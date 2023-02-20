import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { Category } from '../../../types/Category'
import { FormControl, FormGroup } from '@angular/forms'
import { Color } from 'src/types/Color'

/*
TODO: [x] View as table with order
TODO: [x] Add new category
TODO: [x] Delete category (idk what do with statistic.. -.-)
			Возле поля таблицы должна появляться кнопка удаления(вообще это будет набор кнопок) при нажатии на которую всплывёт модалка где нужно будет подтвердить удаление
TODO: [ ] Change category info
			При клике на текстовое поле появится инпут на его месте в который можно будет вписать новое значение, после закрытия инпута запрос в api на изменение
			При клике на цвет - на его месте появляется открытый select color
TODO: [ ] Drag-n-drop order
*/
@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
	categories: Array<Category> | null = null
	colors: Array<Color> | null = null

	addForm = new FormGroup({
		name: new FormControl<string>(''),
		comment: new FormControl<string>(''),
		color: new FormControl<string | null>(null)
	})

	public isAddFormOpened = false

	reloadCategories() {
		this.api.getAllCategories().subscribe(categories => {
			this.categories = categories
		})
	}

	ngOnInit() {
		this.reloadCategories()

		this.api.getAllColors().subscribe(colors => {
			this.colors = colors
		})
	}

	sortedCategoriesByOrder() {
		if (!this.categories) return null

		return this.categories.sort((a, b) => {
			return a.order > b.order ? 1 : -1
		})
	}

	constructor(private api: ApiService) {}

	toggleAddForm() {
		this.isAddFormOpened = !this.isAddFormOpened
	}

	onSubmitAddForm() {
		const value = this.addForm.value

		if (!value.name || !value.comment || !value.color) {
			return
		}
		const valueForSend = {
			name: value.name,
			comment: value.comment,
			color: value.color
		}

		this.api.addCategory(valueForSend).subscribe(value => {
			console.log('addCategory: ', value)
			this.reloadCategories()
			this.toggleAddForm()
		})
	}

	deleteCategory(category: Category) {
		this.api.deleteCategory(category._id).subscribe(value => {
			this.reloadCategories()
		})
	}
}
