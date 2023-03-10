import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Store } from '@ngrx/store'
import { ApiService } from 'src/app/services/api.service'
import { Category } from 'src/types/Category'
import { RootState } from 'src/app/store'
import { selectCategories } from 'src/app/store/categories'
import { StatisticActions } from 'src/app/store/statistic'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	addForm = new FormGroup({
		count: new FormControl<number>(0),
		comment: new FormControl<string>(''),
		category: new FormControl<string | null>(null)
	})

	categories: Category[] | null = null

	onSubmit() {
		const value = this.addForm.value

		if (!value.count || value.comment == null || !value.category) {
			return
		}

		const valueForSend = {
			count: value.count,
			comment: value.comment,
			category: value.category,
			date: new Date(Date.now()).getTime(),
			summ: 0
		}

		console.log(valueForSend)

		this.store.dispatch(StatisticActions.addStatistic(valueForSend))
	}

	ngOnInit() {
		this.store.select(selectCategories).subscribe(value => {
			this.categories = value
		})
	}

	constructor(private store: Store<RootState>) {}
}
