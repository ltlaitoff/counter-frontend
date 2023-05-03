import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { sortedByOrder } from 'src/app/helpers'
import { RootState } from 'src/app/store'
import { CategoryGroupsActions } from 'src/app/store/category-groups/category-groups.actions'
import { AddCategoryGroupInputs } from 'src/types/ApiInputs'
import { CategoryGroupsStateItemWithColor } from '../../../store/category-groups/category-groups.types'

@Component({
	selector: 'counter-category-groups-form',
	templateUrl: './category-groups-form.component.html',
	styleUrls: ['./category-groups-form.component.scss']
})
export class CategoryGroupsFormComponent {
	@Input() categoryGroups: any | null = null
	@Input() choicedCategoryGroups: any | null = null

	@Output() addChoicedCategoryGroup = new EventEmitter<any>()
	@Output() deleteChoicedCategoryGroup = new EventEmitter<any>()

	@Output() editCategoryGroup = new EventEmitter<
		[CategoryGroupsStateItemWithColor, any]
	>()
	@Output() deleteCategoryGroup =
		new EventEmitter<CategoryGroupsStateItemWithColor>()
	@Output() addNewCategoryGroup = new EventEmitter<any>()

	isEditCategoryGroupFormShowed: string | null = null
	isAddFormOpened: boolean = false

	get categoryGroupsList(): any {
		return sortedByOrder(this.categoryGroups)
	}

	get categoryGroupsChoiced(): any {
		return sortedByOrder(this.choicedCategoryGroups)
	}

	onDeleteClick(categoryGroup: any) {
		this.deleteChoicedCategoryGroup.emit(categoryGroup)
	}

	onAddClick(categoryGroup: any) {
		if (this.checkIsCategoryGroupChecked(categoryGroup._id)) {
			return
		}

		this.addChoicedCategoryGroup.emit(categoryGroup)
	}

	clickInsideForm(event: MouseEvent) {
		event.stopPropagation()
		this.isEditCategoryGroupFormShowed = null
	}

	toggleEditCategoryGroupForm(event: MouseEvent, categoryGroup: any) {
		event.stopPropagation()

		if (this.isEditCategoryGroupFormShowed === null) {
			this.isEditCategoryGroupFormShowed = categoryGroup._id
			return
		}

		this.isEditCategoryGroupFormShowed = null
	}

	closeForms() {
		this.isEditCategoryGroupFormShowed = null
		this.isAddFormOpened = false
	}

	toggleAddForm() {
		this.isAddFormOpened = !this.isAddFormOpened
	}

	checkIsCategoryGroupChecked(categoryGroupId: string) {
		return (
			this.choicedCategoryGroups.find(
				(item: any) => item._id === categoryGroupId
			) !== undefined
		)
	}

	editCategoryGroupInner(
		currentValue: CategoryGroupsStateItemWithColor,
		editedValue: any
	) {
		this.isEditCategoryGroupFormShowed = null
		this.isAddFormOpened = false

		this.editCategoryGroup.emit([currentValue, editedValue])
	}

	deleteCategoryGroupInner(category: CategoryGroupsStateItemWithColor) {
		this.deleteCategoryGroup.emit(category)
	}

	addNewCategoryGroupInner(categoryForAdd: AddCategoryGroupInputs) {
		this.isAddFormOpened = false

		this.addNewCategoryGroup.emit(categoryForAdd)
	}
}
