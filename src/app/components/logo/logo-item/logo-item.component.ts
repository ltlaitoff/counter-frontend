import { Component, ElementRef, Input, OnInit } from '@angular/core'
import { colors } from './logo-item.config'
import { LogoItemColors } from './logo-item.types'

@Component({
	selector: 'app-logo-item',
	templateUrl: './logo-item.component.html',
	styleUrls: ['./logo-item.component.scss']
})
export class LogoItemComponent implements OnInit {
	@Input() color: LogoItemColors = 'slate'
	@Input() delay: number = 0

	backgroundGradient: string = ''

	constructor(private elRef: ElementRef) {}

	ngOnInit(): void {
		console.log(this.color)
		const GRADIENT_TYPE = 'linear-gradient'
		const GRADIENT_DIRECTION = 'to bottom'

		const GRADIENT_COLORS = [
			colors[this.color]['300'],
			colors[this.color]['400'],
			colors[this.color]['500'],
			colors[this.color]['600']
		].join(',')

		this.backgroundGradient = `background-image: ${GRADIENT_TYPE}(${GRADIENT_DIRECTION},${GRADIENT_COLORS});`
		console.log(this.backgroundGradient)

		this.setAnimationDelayProperty(this.delay)
	}

	private setAnimationDelayProperty(delay: number) {
		const delayNear = `${delay}s`
		const delayDistant = `${delay - 4}s`

		this.elRef.nativeElement.style.setProperty(
			'--animation-delay-near',
			delayNear
		)

		this.elRef.nativeElement.style.setProperty(
			'--animation-delay-distant',
			delayDistant
		)
	}
}
