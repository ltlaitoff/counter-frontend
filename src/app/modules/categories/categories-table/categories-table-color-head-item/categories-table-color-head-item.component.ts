import { Component } from '@angular/core'
import { AnimationItem } from 'lottie-web'

@Component({
	selector: 'counter-categories-table-color-head-item',
	templateUrl: './categories-table-color-head-item.component.html',
	styleUrls: ['./categories-table-color-head-item.component.scss']
})
export class CategoriesTableColorHeadItemComponent {
	animationItem: AnimationItem | null = null

	onAnimate(newAnimationItem: AnimationItem): void {
		if (this.animationItem !== null) return

		this.animationItem = newAnimationItem
	}

	mouseEnter() {
		this.animationItem?.play()
	}

	mouseLeave() {
		this.animationItem?.stop()
	}
}
