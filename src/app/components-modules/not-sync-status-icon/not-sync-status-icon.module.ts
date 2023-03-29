import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NotSyncStatusIconComponent } from './not-sync-status-icon.component'
import { AngularSvgIconModule } from 'angular-svg-icon'

@NgModule({
	declarations: [NotSyncStatusIconComponent],
	imports: [CommonModule, AngularSvgIconModule.forRoot()],
	exports: [NotSyncStatusIconComponent]
})
export class NotSyncStatusIconModule {}
