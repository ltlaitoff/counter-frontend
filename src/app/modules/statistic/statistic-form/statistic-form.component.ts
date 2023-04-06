import { Component, Input, Output, EventEmitter } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import { RootState } from 'src/app/store'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import { AddStatisticInputs } from '../../../../types/ApiInputs'
import { selectCategories } from '../../../store/categories/categories.select'

@Component({
	selector: 'counter-statistic-form',
	templateUrl: './statistic-form.component.html',
	styleUrls: ['./statistic-form.component.scss']
})
export class StatisticFormComponent {
	@Input() initialFormData: {
		date: string
		count: number
		comment: string
		category: string
	} | null = null

	@Input() fromType: 'add' | 'edit' = 'add'
	@Output() onSubmit = new EventEmitter<AddStatisticInputs>()

	formData = new FormGroup({
		date: new FormControl<string>(''),
		count: new FormControl<number>(0),
		comment: new FormControl<string>(''),
		category: new FormControl<string | null>(null)
	})

	categories: CategoryStateItemWithColor[] | null = null
	localSelectCategoriesDropDownStatus: boolean = false

	ngOnInit() {
		this.store.select(selectCategories).subscribe(value => {
			this.categories = value
		})

		if (!this.initialFormData) {
			throw new Error('initialFormData on edit stastistic required!')
		}

		this.initialFormData.date = this.formatDateToDateTimeLocalInput(
			this.initialFormData.date
		)

		this.formData.setValue(this.initialFormData)
	}

	private formatDateToDateTimeLocalInput(input: string) {
		const inputAsDate = new Date(input)

		const dateWithTimezoneOffset = new Date(
			inputAsDate.getTime() - inputAsDate.getTimezoneOffset() * 60000
		)

		const result = dateWithTimezoneOffset.toISOString().slice(0, -5)

		return result
	}

	onSubmitAddForm() {
		const valueForSend = this.prepareSubmitData(this.formData.value)

		if (valueForSend == null) {
			return
		}

		this.onSubmit.emit(valueForSend)
	}

	private prepareSubmitData(value: typeof this.formData.value) {
		if (
			!value.count ||
			value.comment == null ||
			!value.date ||
			!value.category
		) {
			return null
		}

		const valueForSend = {
			count: value.count,
			comment: value.comment,
			category: value.category,
			date: value.date,
			summ: -1
		}

		return valueForSend
	}

	get formTypeIsAdd() {
		return this.fromType === 'add'
	}

	get formTypeIsEdit() {
		return this.fromType === 'edit'
	}

	testClick(event: MouseEvent) {
		console.log('select form:', event.target)
		console.log('select form:', event.currentTarget)

		if (this.localSelectCategoriesDropDownStatus) {
		}

		event.stopPropagation()
	}

	setLocalSelectCategoriesDropDownStatus(value: boolean) {
		this.localSelectCategoriesDropDownStatus = value
	}

	constructor(private store: Store<RootState>) {}
}
