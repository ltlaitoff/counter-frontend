import { Component, EventEmitter, Input, Output } from '@angular/core'
import { LoadStatus } from 'src/app/store/store.types'
import { ICONS } from './load-status-button.config'

@Component({
	selector: 'counter-load-status-button',
	templateUrl: './load-status-button.component.html',
	styleUrls: ['./load-status-button.component.scss']
})
export class LoadStatusButtonComponent {
	@Output() buttonClick = new EventEmitter()
	@Input() status: LoadStatus | null = LoadStatus.ERROR

	icons = ICONS

	onClick() {
		this.buttonClick.emit()
	}
}
