import { CdkDragDrop } from '@angular/cdk/drag-drop'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { sortedByOrder } from 'src/app/helpers'
import { RootState } from 'src/app/store'
import { CategoryGroupsActions } from 'src/app/store/category-groups/category-groups.actions'
import { AddCategoryGroupInputs } from 'src/types/ApiInputs'
import {
	CategoryGroupsStateItemWithColor,
	CategoryGroupsSyncStateItemWithColor
} from '../../../store/category-groups/category-groups.types'

@Component({
	selector: 'counter-category-groups-form',
	templateUrl: './category-groups-form.component.html',
	styleUrls: ['./category-groups-form.component.scss']
})
export class CategoryGroupsFormComponent {
	@Input() categoryGroups: CategoryGroupsStateItemWithColor[] | null = null
	@Input() choicedCategoryGroups: CategoryGroupsStateItemWithColor[] | null =
		null

	@Output() addChoicedCategoryGroup =
		new EventEmitter<CategoryGroupsStateItemWithColor>()
	@Output() deleteChoicedCategoryGroup =
		new EventEmitter<CategoryGroupsStateItemWithColor>()

	@Output() editCategoryGroup = new EventEmitter<
		[CategoryGroupsStateItemWithColor, AddCategoryGroupInputs]
	>()
	@Output() deleteCategoryGroup =
		new EventEmitter<CategoryGroupsStateItemWithColor>()

	@Output() addNewCategoryGroup = new EventEmitter<AddCategoryGroupInputs>()

	isEditCategoryGroupFormShowed: string | null = null
	isAddFormOpened: boolean = false

	get categoryGroupsList() {
		return sortedByOrder(this.categoryGroups)
	}

	get categoryGroupsChoiced() {
		return this.choicedCategoryGroups
	}

	onDeleteClick(categoryGroup: CategoryGroupsStateItemWithColor) {
		this.deleteChoicedCategoryGroup.emit(categoryGroup)
	}

	onAddClick(categoryGroup: CategoryGroupsStateItemWithColor) {
		if (this.checkIsCategoryGroupChecked(categoryGroup._id)) {
			return
		}

		this.addChoicedCategoryGroup.emit(categoryGroup)
	}

	clickInsideForm(event: MouseEvent) {
		event.stopPropagation()
		this.isEditCategoryGroupFormShowed = null
	}

	toggleEditCategoryGroupForm(
		event: MouseEvent,
		categoryGroup: CategoryGroupsStateItemWithColor
	) {
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
		if (this.choicedCategoryGroups === null) {
			return false
		}

		return (
			this.choicedCategoryGroups.find(item => item._id === categoryGroupId) !==
			undefined
		)
	}

	editCategoryGroupInner(
		currentValue: CategoryGroupsStateItemWithColor,
		editedValue: AddCategoryGroupInputs
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

	drop(
		event: CdkDragDrop<
			CategoryGroupsSyncStateItemWithColor[],
			CategoryGroupsSyncStateItemWithColor[],
			CategoryGroupsSyncStateItemWithColor
		>
	) {
		if (this.categoryGroupsList === null) return
		if (event.previousIndex === event.currentIndex) return

		const categoryData = event.item.data
		const previousIndex = categoryData.order
		const currentIndex = this.categoryGroupsList[event.currentIndex].order

		this.store.dispatch(
			CategoryGroupsActions.reorder({
				props: categoryData,
				previousIndex: previousIndex,
				currentIndex: currentIndex
			})
		)
	}

	constructor(private store: Store<RootState>) {}
}
