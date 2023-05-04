import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Store } from '@ngrx/store'
import { sortedByOrder } from 'src/app/helpers'
import { RootState } from 'src/app/store'
import { selectColors } from 'src/app/store/colors'
import { AddCategoryGroupInputs } from 'src/types/ApiInputs'
import { Color } from 'src/types/Color'

@Component({
	selector: 'counter-category-groups-add-change-form',
	templateUrl: './category-groups-add-change-form.component.html',
	styleUrls: ['./category-groups-add-change-form.component.scss']
})
export class CategoryGroupsAddChangeFormComponent {
	@Input() initialFormData: {
		name: string
		color: string
	} | null = null
	@Input() fromType: 'add' | 'edit' = 'add'

	@Output() onSubmit = new EventEmitter<AddCategoryGroupInputs>()
	@Output() onDelete = new EventEmitter()

	colors: Color[] | null = null

	formData = new FormGroup({
		name: new FormControl<string>(this.initialFormData?.name || ''),
		color: new FormControl<string | null>(this.initialFormData?.color || null)
	})

	ngOnInit() {
		this.store.select(selectColors).subscribe(newColors => {
			this.colors = newColors
		})

		if (this.initialFormData) {
			this.formData.setValue(this.initialFormData)
		}
	}

	onSubmitAddForm(event: SubmitEvent) {
		event.stopPropagation()

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
		if (!value.name || !value.color) {
			return null
		}

		const valueForSend = {
			name: value.name,
			color: value.color
		}

		return valueForSend
	}

	get formTypeIsAdd() {
		return this.fromType === 'add'
	}

	get formTypeIsEdit() {
		return this.fromType === 'edit'
	}

	stopPropagation(event: Event) {
		event.stopPropagation()
	}

	deleteButtonClick() {
		this.onDelete.emit()
	}

	constructor(private store: Store<RootState>) {}
}
