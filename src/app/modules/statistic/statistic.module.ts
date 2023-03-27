import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StatisticComponent } from './statistic-page/statistic-page.component'
import { StatisticChartComponent } from './statistic-chart/statistic-chart.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { StatisticLogComponent } from './statistic-log/statistic-log.component'

@NgModule({
	declarations: [
		StatisticComponent,
		StatisticChartComponent,
		StatisticLogComponent
	],
	imports: [CommonModule, AngularSvgIconModule.forRoot()],
	exports: [StatisticComponent, StatisticLogComponent]
})
export class StatisticModule {}