import { Component, Input, EventEmitter, Output } from '@angular/core'

@Component({
	selector: 'user-panel-form-item',
	templateUrl: './user-panel-form-item.component.html'
})
export class UserPanelFormItemComponent {
	@Input() text: string = ''
	@Input() imageSrc: string = ''
	@Input() disabled: boolean = false

	@Output() onClick = new EventEmitter()

	onButtonClick() {
		this.onClick.emit()
	}
}
