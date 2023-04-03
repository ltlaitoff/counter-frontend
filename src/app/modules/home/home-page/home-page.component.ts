import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Category } from 'src/types/Category'
import { RootState } from 'src/app/store'
import { selectCategories } from 'src/app/store/categories'
import { StatisticActions } from 'src/app/store/statistic'

@Component({
	selector: 'counter-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
	addForm = new FormGroup({
		count: new FormControl<number>(0),
		comment: new FormControl<string>(''),
		category: new FormControl<string | null>(null)
	})

	categories: Category[] | null = null

	ngOnInit() {
		this.store.select(selectCategories).subscribe(value => {
			this.categories = value
		})
	}

	onSubmit() {
		const valueForSend = this.prepareSubmitData(this.addForm.value)

		if (valueForSend === null) {
			return
		}

		this.store.dispatch(StatisticActions.add(valueForSend))

		this.addForm.reset({
			count: 0,
			comment: '',
			category: valueForSend.category
		})
	}

	private prepareSubmitData(value: typeof this.addForm.value) {
		if (
			value.count == null ||
			value.comment == null ||
			value.category == null
		) {
			return null
		}

		const valueForSend = {
			count: value.count,
			comment: value.comment,
			category: value.category,
			date: new Date(Date.now()).getTime(),
			summ: 0
		}

		return valueForSend
	}

	constructor(private store: Store<RootState>) {}
}
