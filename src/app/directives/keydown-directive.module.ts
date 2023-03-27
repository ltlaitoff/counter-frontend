import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { KeydownDirective } from './keydown.directive'

@NgModule({
	declarations: [KeydownDirective],
	imports: [CommonModule],
	exports: [KeydownDirective]
})
export class KeydownDirectiveModule {}
