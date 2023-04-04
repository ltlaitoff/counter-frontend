import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Color } from 'src/types/Color'
import { sortedByOrder } from 'src/app/helpers'
import { RootState } from 'src/app/store'
import { selectColors } from 'src/app/store/colors'
import { CategoriesBasicSet } from 'src/types/ApiInputs'

@Component({
	selector: 'counter-categories-form',
	templateUrl: './categories-form.component.html',
	styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
	@Input() initialFormData: {
		name: string
		comment: string
		color: string
		dimension: string
	} | null = null
	@Input() fromType: 'add' | 'edit' = 'add'

	@Output() onSubmit = new EventEmitter<CategoriesBasicSet>()

	colors: Color[] | null = null

	formData = new FormGroup({
		name: new FormControl<string>(this.initialFormData?.name || ''),
		comment: new FormControl<string>(this.initialFormData?.comment || ''),
		color: new FormControl<string | null>(this.initialFormData?.color || null),
		dimension: new FormControl<string>(this.initialFormData?.dimension || '')
	})

	ngOnInit() {
		this.store.select(selectColors).subscribe(newColors => {
			this.colors = newColors
		})

		if (this.initialFormData) {
			this.formData.setValue(this.initialFormData)
		}
	}

	onSubmitAddForm() {
		const valueForSend = this.prepareSubmitData(this.formData.value)

		if (valueForSend == null) {
			return
		}

		this.onSubmit.emit(valueForSend)
		this.formData.reset()
	}

	get sortedByOrderColors() {
		return sortedByOrder(this.colors)
	}

	private prepareSubmitData(value: typeof this.formData.value) {
		if (
			!value.name ||
			value.comment == null ||
			!value.color ||
			value.dimension == null
		) {
			return null
		}

		const valueForSend = {
			name: value.name,
			comment: value.comment,
			color: value.color,
			dimension: value.dimension
		}

		return valueForSend
	}

	get formTypeIsAdd() {
		return this.fromType === 'add'
	}

	get formTypeIsEdit() {
		return this.fromType === 'edit'
	}

	constructor(private store: Store<RootState>) {}
}
