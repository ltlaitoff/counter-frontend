import { Component, EventEmitter, Input, Output } from '@angular/core'
import { LoadStatus } from 'src/app/store/store.types'

@Component({
	selector: 'counter-load-status-button',
	templateUrl: './load-status-button.component.html',
	styleUrls: ['./load-status-button.component.scss']
})
export class LoadStatusButtonComponent {
	@Output() buttonClick = new EventEmitter()
	@Input() status: LoadStatus | null = null

	onClick() {
		this.buttonClick.emit()
	}
}
