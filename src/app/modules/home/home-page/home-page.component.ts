import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Store } from '@ngrx/store'
import { formatDateToDateTimeLocalInput } from 'src/app/helpers'

import { RootState } from 'src/app/store'
import { selectCategories } from 'src/app/store/categories'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import { selectCategoryGroups } from 'src/app/store/category-groups/category-groups.select'
import { CategoryGroupsStateItemWithColor } from 'src/app/store/category-groups/category-groups.types'
import { StatisticActions } from 'src/app/store/statistic'

@Component({
	selector: 'counter-home-page',
	templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
	addForm = new FormGroup({
		count: new FormControl<number>(0),
		comment: new FormControl<string>(''),
		category: new FormControl<string | null>(null),
		date: new FormControl<string>('')
	})

	categories: CategoryStateItemWithColor[] | null = null
	categoryGroups: CategoryGroupsStateItemWithColor[] | null = null

	additionalSettingsShow = false
	additinalOptions = {
		doNotClearComment: false,
		doNotClearCount: false,
		showDatetimePicker: false,
		doNotUpdateDateAfterSubmit: false
	}

	ngOnInit() {
		this.store.select(selectCategories).subscribe(value => {
			this.categories = value
		})

		this.store.select(selectCategoryGroups).subscribe(value => {
			this.categoryGroups = value
		})

		this.resetAddFormDate()
	}

	onSubmit() {
		const valueForSend = this.prepareSubmitData(this.addForm.value)

		if (valueForSend === null) {
			return
		}

		console.log(
			'🚀 ~ file: home-page.component.ts:46 ~ HomePageComponent ~ onSubmit ~ valueForSend:',
			valueForSend
		)

		this.store.dispatch(StatisticActions.add(valueForSend))

		this.addForm.reset({
			count: this.additinalOptions.doNotClearCount ? valueForSend.count : 0,
			comment: this.additinalOptions.doNotClearComment
				? valueForSend.comment
				: '',
			category: valueForSend.category,
			date: this.additinalOptions.doNotUpdateDateAfterSubmit
				? valueForSend.datetimeLocalDate
				: this.getFormattedNowDateForDatetimeLocalInput()
		})
	}

	private prepareSubmitData(value: typeof this.addForm.value) {
		if (
			value.count == null ||
			value.comment == null ||
			value.category == null ||
			value.date == null
		) {
			return null
		}

		const submitDate = this.additinalOptions.showDatetimePicker
			? new Date(value.date).toISOString()
			: new Date(Date.now()).toISOString()

		const valueForSend = {
			count: value.count,
			comment: value.comment,
			category: value.category,
			date: submitDate,
			datetimeLocalDate: value.date,
			summ: 0
		}

		return valueForSend
	}

	get choicedCategory() {
		const categoryId = this.addForm.value.category
		// console.log('%c⧭', 'color: #731d6d', categoryId)

		// console.log('%c⧭', 'color: #e57373', this.categories)

		if (categoryId === null || this.categories === null) return null

		const findedCategoty = this.categories.find(
			item => item._id === this.addForm.value.category
		)

		// console.log('%c⧭', 'color: #997326', findedCategoty)

		if (findedCategoty == undefined) return null

		return findedCategoty
	}

	private resetAddFormDate() {
		this.addForm.setValue({
			...this.addForm.getRawValue(),
			date: this.getFormattedNowDateForDatetimeLocalInput()
		})
	}

	private getFormattedNowDateForDatetimeLocalInput() {
		return formatDateToDateTimeLocalInput(new Date(Date.now()))
	}

	toggleAdditionalOptionsShow() {
		this.additionalSettingsShow = !this.additionalSettingsShow
	}

	constructor(private store: Store<RootState>) {}
}
