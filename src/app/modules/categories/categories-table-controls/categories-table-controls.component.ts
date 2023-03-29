import { Component, EventEmitter, Output } from '@angular/core'

@Component({
	selector: 'counter-categories-table-controls',
	templateUrl: './categories-table-controls.component.html',
	styleUrls: ['./categories-table-controls.component.scss']
})
export class CategoriesTableControlsComponent {
	@Output() onDelete = new EventEmitter()

	onDeleteClick() {
		this.onDelete.emit()
	}
}
