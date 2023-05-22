import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TimeNumberPickerComponent } from './time-number-picker.component'
import { ButtonsModule } from 'src/app/modules/buttons/buttons.module'
import { FormsModule } from '@angular/forms'

@NgModule({
	declarations: [TimeNumberPickerComponent],
	imports: [CommonModule, ButtonsModule, FormsModule],
	exports: [TimeNumberPickerComponent]
})
export class TimeNumberPickerModule {}
