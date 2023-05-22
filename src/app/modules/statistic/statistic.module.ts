import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StatisticComponent } from './statistic-page/statistic-page.component'
import { StatisticChartComponent } from './statistic-chart/statistic-chart.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { StatisticLogComponent } from './statistic-log/statistic-log.component'
import { LoadStatusButtonModule } from 'src/app/components-modules/load-status-button/load-status-button.module'
import { NotSyncStatusIconModule } from '../../components-modules/not-sync-status-icon/not-sync-status-icon.module'
import { TableControlsModule } from 'src/app/components-modules/table-controls/table-controls.module'
import { StatisticFormComponent } from './statistic-form/statistic-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CategoriesModule } from '../categories/categories.module'
import { ClickedOutsideDirectiveModule } from '../../directives/clicked-outside-directive.module'
import { KeydownDirectiveModule } from '../../directives/keydown-directive.module';
import { StatisticChartOptionsComponent } from './statistic-chart-options/statistic-chart-options.component'

@NgModule({
	declarations: [
		StatisticComponent,
		StatisticChartComponent,
		StatisticLogComponent,
		StatisticFormComponent,
  StatisticChartOptionsComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AngularSvgIconModule.forRoot(),
		LoadStatusButtonModule,
		NotSyncStatusIconModule,
		TableControlsModule,
		CategoriesModule,
		ClickedOutsideDirectiveModule,
		KeydownDirectiveModule
	],
	exports: [StatisticComponent, StatisticLogComponent]
})
export class StatisticModule {}
