import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
	selector: 'counter-category-groups-item',
	templateUrl: './category-groups-item.component.html',
	styleUrls: ['./category-groups-item.component.scss']
})
export class CategoryGroupsItemComponent {
	@Input() color: string = ''
	@Input() name: string = ''
	@Input() showDeleteButton: boolean = false

	@Output() onDelete = new EventEmitter()

	onDeleteButtonClick(event: MouseEvent) {
		event.preventDefault()

		this.onDelete.emit()
	}
}
