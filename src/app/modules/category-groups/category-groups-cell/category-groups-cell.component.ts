import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core'
import { Store } from '@ngrx/store'
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
	isFormShowed: boolean = false

	ngOnInit() {
		this.updateChoicedCategoryGroups(
			this.categoryGroups,
			this.allCategoryGroups
		)
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['allCategoryGroups'].firstChange) return

		const allCategoryGroups: CategoryGroupsStateItemWithColor[] =
			changes['allCategoryGroups'].currentValue

		if (this.choicedCategoryGroups.length === 0) {
			this.updateChoicedCategoryGroups(this.categoryGroups, allCategoryGroups)
			return
		}

		const choicedCategoryGroupsAsStringArray = this.choicedCategoryGroups.map(
			item => item._id
		)

		this.updateChoicedCategoryGroups(
			choicedCategoryGroupsAsStringArray,
			allCategoryGroups
		)
	}

	closeForm() {
		this.isFormShowed = false

		this.updateCategoryGroup()
	}

	showForm() {
		this.isFormShowed = true
	}

	addChoicedCategoryGroup(categoryGroup: CategoryGroupsStateItemWithColor) {
		this.choicedCategoryGroups = [...this.choicedCategoryGroups, categoryGroup]
	}

	deleteChoicedCategoryGroup(categoryGroup: CategoryGroupsStateItemWithColor) {
		this.choicedCategoryGroups = this.choicedCategoryGroups.filter(
			item => item._id !== categoryGroup._id
		)
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

	private updateChoicedCategoryGroups(
		categoryGroups: string[],
		allCategoryGroups: CategoryGroupsStateItemWithColor[]
	) {
		this.choicedCategoryGroups = categoryGroups
			.map(value => allCategoryGroups.find(item => item._id === value))
			.filter(item => item != undefined) as CategoryGroupsStateItemWithColor[]
	}

	private updateCategoryGroup() {
		const choicedCategoryGroupsAsStringArray = this.choicedCategoryGroups.map(
			item => item._id
		)

		if (arraysEqual(this.categoryGroups, choicedCategoryGroupsAsStringArray)) {
			return
		}

		this.changeCategoryGroups.emit(choicedCategoryGroupsAsStringArray)
	}

	constructor(private store: Store<RootState>) {}
}
