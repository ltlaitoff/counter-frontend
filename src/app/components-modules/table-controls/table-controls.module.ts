import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TableControlsComponent } from './table-controls.component'
import { AngularSvgIconModule } from 'angular-svg-icon'

@NgModule({
	declarations: [TableControlsComponent],
	imports: [CommonModule, AngularSvgIconModule.forRoot()],
	exports: [TableControlsComponent]
})
export class TableControlsModule {}
