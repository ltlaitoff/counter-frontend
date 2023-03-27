import { Component, EventEmitter, Input, Output } from '@angular/core'
import { User } from 'src/types/User'

@Component({
	selector: 'app-user-panel-open-button',
	templateUrl: './user-panel-open-button.component.html'
})
export class UserPanelOpenButtonComponent {
	@Input() userInfo: User | null = null
	@Input() isOpened: boolean = false

	@Output() buttonClick = new EventEmitter()

	onButtonClick() {
		this.buttonClick.emit()
	}
}
