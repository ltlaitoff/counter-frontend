import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core'
import { Store } from '@ngrx/store'
import { sortedByOrder } from 'src/app/helpers'
import { RootState } from 'src/app/store'
import { CategoryGroupsActions } from 'src/app/store/category-groups/category-groups.actions'
import { CategoryGroupsStateItemWithColor } from 'src/app/store/category-groups/category-groups.types'
import { AddCategoryGroupInputs } from 'src/types/ApiInputs'
import { arraysEqual } from '../helpers/arrays-equal.helper'

@Component({
	selector: 'counter-category-groups-cell',
	templateUrl: './category-groups-cell.component.html'
})
export class CategoryGroupsCellComponent implements OnInit {
	@Input() categoryGroups: Array<string> = []
	@Input() allCategoryGroups: CategoryGroupsStateItemWithColor[] = []

	@Output() changeCategoryGroups = new EventEmitter<string[]>()

	choicedCategoryGroups: CategoryGroupsStateItemWithColor[] = []

	ngOnInit() {
		this.choicedCategoryGroups = this.categoryGroups
			.map((currentValue: string) => {
				const result = this.allCategoryGroups.find(item => {
					return item._id === currentValue
				})
				if (!result) return null
				return result
			})
			.filter(item => item !== null) as CategoryGroupsStateItemWithColor[]
	}

	ngOnChanges(changes: SimpleChanges) {
		if (!changes['allCategoryGroups'].firstChange) {
			const allCategoryGroups: CategoryGroupsStateItemWithColor[] =
				changes['allCategoryGroups'].currentValue

			if (this.choicedCategoryGroups.length !== 0) {
				this.choicedCategoryGroups = this.choicedCategoryGroups
					.map(currentValue => {
						const result = allCategoryGroups.find(item => {
							return item._id === currentValue._id
						})

						if (!result) return null

						return result
					})
					.filter(item => item !== null) as CategoryGroupsStateItemWithColor[]

				return
			}

			this.choicedCategoryGroups = this.categoryGroups
				.map((currentValue: string) => {
					const result = allCategoryGroups.find(item => {
						return item._id === currentValue
					})
					if (!result) return null
					return result
				})
				.filter(item => item !== null) as CategoryGroupsStateItemWithColor[]
		}
	}

	isFormShowed: boolean = false

	addChoicedCategoryGroup(categoryGroup: CategoryGroupsStateItemWithColor) {
		this.choicedCategoryGroups.push(categoryGroup)

		this.choicedCategoryGroups = [...this.choicedCategoryGroups]
	}

	deleteChoicedCategoryGroup(categoryGroup: CategoryGroupsStateItemWithColor) {
		this.choicedCategoryGroups = this.choicedCategoryGroups.filter(item => {
			return item._id !== categoryGroup._id
		})
	}

	showForm() {
		this.isFormShowed = true
	}

	private updateCategoryGroup() {
		// TODO: Renamed `tmp`
		const tmp = this.choicedCategoryGroups.map(item => item._id)

		if (arraysEqual(this.categoryGroups, tmp)) {
			return
		}

		this.changeCategoryGroups.emit(tmp)
	}

	closeForm() {
		this.isFormShowed = false

		this.updateCategoryGroup()
	}

	editCategoryGroup([currentValue, editedValue]: [
		CategoryGroupsStateItemWithColor,
		AddCategoryGroupInputs
	]) {
		this.store.dispatch(
			CategoryGroupsActions.update({
				old: currentValue,
				dataForUpdate: editedValue
			})
		)
	}

	deleteCategoryGroup(category: CategoryGroupsStateItemWithColor) {
		this.store.dispatch(CategoryGroupsActions.delete(category))
	}

	addNewCategoryGroup(categoryForAdd: AddCategoryGroupInputs) {
		this.store.dispatch(CategoryGroupsActions.add(categoryForAdd))
	}

	constructor(private store: Store<RootState>) {}
}
