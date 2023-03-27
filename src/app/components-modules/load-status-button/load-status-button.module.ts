import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoadStatusButtonComponent } from './load-status-button.component'
import { ButtonsModule } from 'src/app/modules/buttons/buttons.module'

@NgModule({
	declarations: [LoadStatusButtonComponent],
	imports: [CommonModule, ButtonsModule],
	exports: [LoadStatusButtonComponent]
})
export class LoadStatusButtonModule {}
