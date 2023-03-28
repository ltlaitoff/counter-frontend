import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Color } from 'src/types/Color'
import { sortedByOrder } from 'src/app/helpers'
import { RootState } from 'src/app/store'
import { CategoriesActions } from 'src/app/store/categories'
import { selectColors } from 'src/app/store/colors'

@Component({
	selector: 'counter-categories-form-add-new',
	templateUrl: './categories-form-add-new.component.html',
	styleUrls: ['./categories-form-add-new.component.scss']
})
export class CategoriesFormAddNewComponent implements OnInit {
	colors: Color[] | null = null

	addForm = new FormGroup({
		name: new FormControl<string>(''),
		comment: new FormControl<string>(''),
		color: new FormControl<string | null>(null)
	})

	@Output() onSubmit = new EventEmitter()

	ngOnInit() {
		this.store.select(selectColors).subscribe(newColors => {
			this.colors = newColors
		})
	}

	onSubmitAddForm() {
		const valueForSend = this.prepareSubmitData(this.addForm.value)

		if (valueForSend == null) {
			return
		}

		this.store.dispatch(CategoriesActions.add(valueForSend))

		this.addForm.reset()
		this.onSubmit.emit()
	}

	get sortedByOrderColors() {
		return sortedByOrder(this.colors)
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
