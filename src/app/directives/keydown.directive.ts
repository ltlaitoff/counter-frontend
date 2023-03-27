import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Output
} from '@angular/core'

@Directive({
	selector: '[appKeydown]'
})
export class KeydownDirective {
	constructor(private el: ElementRef) {}

	@Output() keydownPress = new EventEmitter()
	@Output() escapePress = new EventEmitter()

	@HostListener('document:keydown', ['$event'])
	public onClick(event: KeyboardEvent) {
		this.keydownPress.emit(event)
		this.callSpecifyKeysEvents(event)
	}

	private callSpecifyKeysEvents(event: KeyboardEvent) {
		switch (event.key) {
			case 'Escape':
				return this.escapePress.emit()
		}
	}
}
