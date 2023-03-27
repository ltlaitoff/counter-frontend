import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
	selector: 'app-user-panel-form',
	templateUrl: './user-panel-form.component.html'
})
export class UserPanelFormComponent {
	@Output() exitClick = new EventEmitter()

	onExitClick() {
		this.exitClick.emit()
	}
}
