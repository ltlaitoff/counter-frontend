import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ColorSelectComponent } from './color-select/color-select.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

@NgModule({
	declarations: [ColorSelectComponent],
	imports: [CommonModule, ReactiveFormsModule, FormsModule],
	exports: [ColorSelectComponent]
})
export class ColorModule {}
