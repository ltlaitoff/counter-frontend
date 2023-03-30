import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StatisticComponent } from './statistic-page/statistic-page.component'
import { StatisticChartComponent } from './statistic-chart/statistic-chart.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { StatisticLogComponent } from './statistic-log/statistic-log.component'
import { LoadStatusButtonModule } from 'src/app/components-modules/load-status-button/load-status-button.module'
import { NotSyncStatusIconModule } from '../../components-modules/not-sync-status-icon/not-sync-status-icon.module'
import { TableControlsModule } from 'src/app/components-modules/table-controls/table-controls.module'

@NgModule({
	declarations: [
		StatisticComponent,
		StatisticChartComponent,
		StatisticLogComponent
	],
	imports: [
		CommonModule,
		AngularSvgIconModule.forRoot(),
		LoadStatusButtonModule,
		NotSyncStatusIconModule,
		TableControlsModule
	],
	exports: [StatisticComponent, StatisticLogComponent]
})
export class StatisticModule {}
