import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StatisticComponent } from './statistic.component'
import { StatisticChartComponent } from './statistic-chart/statistic-chart.component'
import { AngularSvgIconModule } from 'angular-svg-icon'

@NgModule({
	declarations: [StatisticComponent, StatisticChartComponent],
	imports: [CommonModule, AngularSvgIconModule.forRoot()],
	exports: [StatisticComponent]
})
export class StatisticModule {}
