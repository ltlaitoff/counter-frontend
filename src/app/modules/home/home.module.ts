import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomePageComponent } from './home-page/home-page.component'
import { CategoriesModule } from '../categories/categories.module'
import { StatisticModule } from '../statistic/statistic.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AngularSvgIconModule } from 'angular-svg-icon'

@NgModule({
	declarations: [HomePageComponent],
	imports: [
		CommonModule,
		CategoriesModule,
		StatisticModule,
		ReactiveFormsModule,
		AngularSvgIconModule,
		FormsModule
	],
	exports: [HomePageComponent]
})
export class HomeModule {}
