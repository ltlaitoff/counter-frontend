import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { OutlineButtonComponent } from './outline-button/outline-button.component'

@NgModule({
	declarations: [OutlineButtonComponent],
	imports: [CommonModule],
	exports: [OutlineButtonComponent]
})
export class ButtonsModule {}
