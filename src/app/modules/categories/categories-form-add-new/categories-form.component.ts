import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { CategoriesBasicSet } from 'src/types/ApiInputs'

@Component({
	selector: 'counter-categories-form',
	templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {
	@Input() initialFormData: {
		name: string
		comment: string
		color: string
		dimension: string
		mode?: string
	} | null = null
	@Input() fromType: 'add' | 'edit' = 'add'

	@Output() onSubmit = new EventEmitter<CategoriesBasicSet>()

	formData = new FormGroup({
		name: new FormControl<string>(this.initialFormData?.name || ''),
		comment: new FormControl<string>(this.initialFormData?.comment || ''),
		color: new FormControl<string | null>(this.initialFormData?.color || null),
		mode: new FormControl<string>(this.initialFormData?.mode || 'number'),
		dimension: new FormControl<string>(this.initialFormData?.dimension || '')
	})

	ngOnInit() {
		if (this.initialFormData) {
			this.formData.setValue({
				...this.initialFormData,
				mode: this.initialFormData?.mode || 'number'
			})
		}
	}

	onSubmitAddForm() {
		const valueForSend = this.prepareSubmitData(this.formData.value)

		if (valueForSend == null) {
			return
		}

		this.onSubmit.emit(valueForSend)

		this.formData.reset({
			name: '',
			comment: '',
			color: null,
			mode: this.formData.value.mode || 'number',
			dimension: ''
		})
	}

	private prepareSubmitData(value: typeof this.formData.value) {
		if (
			!value.name ||
			value.comment == null ||
			!value.color ||
			value.dimension == null ||
			!value.mode
		) {
			return null
		}

		const mode: 'number' | 'time' =
			value.mode !== 'number' && value.mode !== 'time' ? 'number' : value.mode

		const valueForSend = {
			name: value.name,
			comment: value.comment,
			color: value.color,
			dimension: value.dimension,
			group: [],
			mode: mode
		}

		return valueForSend
	}

	get formTypeIsAdd() {
		return this.fromType === 'add'
	}

	get formTypeIsEdit() {
		return this.fromType === 'edit'
	}
}
