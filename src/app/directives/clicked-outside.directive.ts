import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Output
} from '@angular/core'

@Directive({
	selector: '[appClickedOutside]'
})
export class ClickedOutsideDirective {
	constructor(private el: ElementRef) {}

	@Output() clickedOutside = new EventEmitter()

	@HostListener('document:click', ['$event.target'])
	public onClick(target: EventTarget | null) {
		const clickedInside = this.el.nativeElement.contains(target)

		if (!clickedInside) {
			this.clickedOutside.emit(target)
		}
	}
}
