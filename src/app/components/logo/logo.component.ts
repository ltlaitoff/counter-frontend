import { Component } from '@angular/core'
import { LogoItemColors } from './logo-item/logo-item.types'

import { LOGO_ITEMS } from './logo.config'
import { LogoItem } from './logo.types'

@Component({
	selector: 'app-logo',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
	logoItems: LogoItem[]

	constructor() {
		this.logoItems = LOGO_ITEMS
	}
}
