import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import {
	ChartInterval,
	ChartBy,
	Mode,
	DateControl,
	Comment
} from '../statistic.types'
import { InitialControls, INITIAL_CONTROLS } from './statistic-controls.config'
import { Store } from '@ngrx/store'
import { RootState } from 'src/app/store'
import { selectCategories } from 'src/app/store/categories'
import { CategoryStateItemWithColor } from 'src/app/store/categories/categories.types'
import { selectCategoryGroups } from 'src/app/store/category-groups/category-groups.select'
import { CategoryGroupsStateItemWithColor } from 'src/app/store/category-groups/category-groups.types'

@Component({
	selector: 'counter-statistic-controls',
	templateUrl: './statistic-controls.component.html'
})
export class StatisticControlsComponent {
	@Input() formData: InitialControls = INITIAL_CONTROLS
	@Output() formDataChange = new EventEmitter<InitialControls>()

	form = new FormGroup({
		'chart-interval': new FormControl<ChartInterval>(
			INITIAL_CONTROLS['chart-interval']
		),
		'chart-by': new FormControl<ChartBy>(INITIAL_CONTROLS['chart-by']),
		categories: new FormControl<string[]>(INITIAL_CONTROLS.categories),
		mode: new FormControl<Mode>(INITIAL_CONTROLS.mode),
		comment: new FormControl<Comment>(INITIAL_CONTROLS.comment),
		date: new FormControl<DateControl>(INITIAL_CONTROLS.date)
	})

	categories: CategoryStateItemWithColor[] | null = null
	categoryGroups: CategoryGroupsStateItemWithColor[] | null = null

	ngOnInit() {
		this.formDataChange.emit(this.form.value as any)

		this.form.valueChanges.subscribe(() => {
			this.formDataChange.emit(this.form.value as any)
		})

		this.store.select(selectCategories).subscribe(value => {
			this.categories = value
		})

		this.store.select(selectCategoryGroups).subscribe(value => {
			this.categoryGroups = value
		})
	}

	constructor(private store: Store<RootState>) {}
}
