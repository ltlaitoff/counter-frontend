import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PanelFormDividerComponent } from './panel-form-divider/panel-form-divider.component'
import { PanelFormItemComponent } from './panel-form-item/panel-form-item.component'
import { AngularSvgIconModule } from 'angular-svg-icon'

@NgModule({
	declarations: [PanelFormDividerComponent, PanelFormItemComponent],
	imports: [CommonModule, AngularSvgIconModule],
	exports: [PanelFormDividerComponent, PanelFormItemComponent]
})
export class PanelFormModule {}
