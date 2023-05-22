import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomePageComponent } from './home-page/home-page.component'
import { CategoriesModule } from '../categories/categories.module'
import { StatisticModule } from '../statistic/statistic.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { TimeNumberPickerModule } from 'src/app/components-modules/time-number-picker/time-number-picker.module'

@NgModule({
	declarations: [HomePageComponent],
	imports: [
		CommonModule,
		CategoriesModule,
		StatisticModule,
		ReactiveFormsModule,
		AngularSvgIconModule,
		FormsModule,
		TimeNumberPickerModule
	],
	exports: [HomePageComponent]
})
export class HomeModule {}
