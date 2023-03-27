import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { CategoriesPageComponent } from './modules/categories/categories-page/categories-page.component'
import { StatisticComponent } from './modules/statistic/statistic-page/statistic-page.component'
import { AuthorizationComponent } from './pages/authorization/authorization.component'
import { AuthGuardService } from './services/auth-guard.service'
import { PerfComponent } from './pages/perf/perf.component'
import { CategoryResolver } from './resolvers/category.resolver'
import { ColorResolver } from './resolvers/color.resolver'
import { StatisticResolver } from './resolvers/statistic.resolver'

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuardService],
		resolve: [CategoryResolver]
	},
	{
		path: 'categories',
		component: CategoriesPageComponent,
		canActivate: [AuthGuardService],
		resolve: [CategoryResolver, ColorResolver]
	},
	{
		path: 'statistic',
		component: StatisticComponent,
		canActivate: [AuthGuardService],
		resolve: [StatisticResolver]
	},
	{
		path: 'authorization',
		canActivate: [AuthGuardService],
		component: AuthorizationComponent
	},
	{
		path: 'perf',
		component: PerfComponent
	},
	{
		path: '',
		redirectTo: '/',
		pathMatch: 'full'
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
