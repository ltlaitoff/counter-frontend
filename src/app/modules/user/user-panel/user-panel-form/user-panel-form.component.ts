import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
	selector: 'user-panel-form',
	templateUrl: './user-panel-form.component.html'
})
export class UserPanelFormComponent {
	@Output() onClick = new EventEmitter<'exit' | 'sessions'>()

	onClickOutput(type: 'exit' | 'sessions') {
		this.onClick.emit(type)
	}
}
