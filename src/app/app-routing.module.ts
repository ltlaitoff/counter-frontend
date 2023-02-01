import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { CategoriesComponent } from './pages/categories/categories.component'
import { StatisticComponent } from './pages/statistic/statistic.component'
import { AuthorizationComponent } from './pages/authorization/authorization.component'
import { AuthGuardService } from './services/auth-guard.service'

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'categories',
		component: CategoriesComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'statistic',
		component: StatisticComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'authorization',
		component: AuthorizationComponent
	},
	{
		path: '',
		redirectTo: '/',
		pathMatch: 'full'
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
