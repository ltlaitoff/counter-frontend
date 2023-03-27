import { Component, EventEmitter, Output } from '@angular/core'

@Component({
	selector: 'counter-outline-button',
	templateUrl: './outline-button.component.html',
	styleUrls: ['./outline-button.component.scss']
})
export class OutlineButtonComponent {
	@Output() buttonClick = new EventEmitter()

	onClick() {
		this.buttonClick.emit()
	}
}
