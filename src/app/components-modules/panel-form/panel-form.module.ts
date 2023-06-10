import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PanelFormDividerComponent } from './panel-form-divider/panel-form-divider.component'
import { PanelFormItemComponent } from './panel-form-item/panel-form-item.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { RouterModule } from '@angular/router'

@NgModule({
	declarations: [PanelFormDividerComponent, PanelFormItemComponent],
	imports: [CommonModule, AngularSvgIconModule, RouterModule],
	exports: [PanelFormDividerComponent, PanelFormItemComponent]
})
export class PanelFormModule {}
