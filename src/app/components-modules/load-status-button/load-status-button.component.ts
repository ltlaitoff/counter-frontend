import { Component, EventEmitter, Output } from '@angular/core'

@Component({
	selector: 'app-load-status-button',
	templateUrl: './load-status-button.component.html',
	styleUrls: ['./load-status-button.component.scss']
})
export class LoadStatusButtonComponent {
	@Output() buttonClick = new EventEmitter()

	onClick() {
		this.buttonClick.emit()
	}
}
