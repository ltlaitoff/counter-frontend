import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
	selector: 'user-panel-form',
	templateUrl: './user-panel-form.component.html'
})
export class UserPanelFormComponent {
	@Output() exitClick = new EventEmitter()

	onExitClick() {
		this.exitClick.emit()
	}
}
