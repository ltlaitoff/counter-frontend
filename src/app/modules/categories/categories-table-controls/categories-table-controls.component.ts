import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
	selector: 'counter-categories-table-controls',
	templateUrl: './categories-table-controls.component.html',
	styleUrls: ['./categories-table-controls.component.scss']
})
export class CategoriesTableControlsComponent {
	@Output() delete = new EventEmitter()
	@Output() edit = new EventEmitter()
	@Output() closeEdit = new EventEmitter()

	@Input() editActive: boolean = false

	onDeleteClick() {
		this.delete.emit()
	}

	onEditClick(event: MouseEvent) {
		event.stopPropagation()

		this.edit.emit()
	}

	closeCategoryEdit() {
		this.closeEdit.emit()
	}
}
