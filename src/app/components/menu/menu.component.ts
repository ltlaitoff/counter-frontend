import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AnimationItem } from 'lottie-web'
import { AnimationOptions } from 'ngx-lottie'
import { MENU_ITEMS } from './menu.config'
import {
	AnimationOptionsWithId,
	AnimationSetStatusTypes,
	MenuItem
} from './menu.types'
import { getAnimationOptions } from './menu.helper'

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html'
})
export class MenuComponent {
	@Input() mini: boolean = false
	@Output() onRouteClick = new EventEmitter()

	menuItems: MenuItem[]

	private animateOptions: AnimationOptionsWithId[]
	private animationItems: AnimationItem[]

	constructor() {
		this.menuItems = MENU_ITEMS
		this.animateOptions = getAnimationOptions(this.menuItems)
		this.animationItems = []
	}

	getAnimateOptions(id: number) {
		const animateOptions = this.animateOptions.find(item => item.id === id)

		if (animateOptions == undefined) {
			console.error(`Not fount animateOptions for id = ${id}`)
			return {}
		}

		return animateOptions
	}

	onAnimate(animationItem: AnimationItem): void {
		this.animationItems.push(animationItem)
	}

	private getAnimationItemById(id: number) {
		return this.animationItems.find(item => item.name === String(id))
	}

	private animationSetStatus(id: number, type: AnimationSetStatusTypes) {
		const animationItem = this.getAnimationItemById(id)

		if (animationItem == undefined) {
			console.log(`No find animation with id = ${id}`)
			return
		}

		switch (type) {
			case AnimationSetStatusTypes.PLAY:
				animationItem.play()
				return

			case AnimationSetStatusTypes.STOP:
				animationItem.stop()
				return

			default:
				console.log(`Not found animationSetStatus type = ${type}`)
				return
		}
	}

	mouseLinkEnter(id: number) {
		this.animationSetStatus(id, AnimationSetStatusTypes.PLAY)
	}

	mouseLinkLeave(id: number) {
		this.animationSetStatus(id, AnimationSetStatusTypes.STOP)
	}

	onRouteClickInner() {
		this.onRouteClick.emit()
	}
}
