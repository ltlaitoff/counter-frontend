import { Component, EventEmitter, Output } from '@angular/core'

@Component({
	selector: 'counter-categories-table-controls',
	templateUrl: './categories-table-controls.component.html',
	styleUrls: ['./categories-table-controls.component.scss']
})
export class CategoriesTableControlsComponent {
	@Output() delete = new EventEmitter()

	onDeleteClick() {
		this.delete.emit()
	}
}
