import { Component, Input, EventEmitter, Output } from '@angular/core'

@Component({
	selector: 'counter-panel-form-item',
	templateUrl: './panel-form-item.component.html'
})
export class PanelFormItemComponent {
	@Input() text: string = ''
	@Input() to: string | undefined = undefined
	@Input() imageSrc: string = ''
	@Input() imageType: 'image' | 'svg' = 'image'
	@Input() imageClass: string = ''
	@Input() disabled: boolean = false

	@Output() onClick = new EventEmitter()

	onButtonClick() {
		this.onClick.emit()
	}
}
