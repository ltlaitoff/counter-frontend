import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { CategoriesComponent } from './pages/categories/categories.component'
import { StatisticComponent } from './pages/statistic/statistic.component'
import { AuthorizationComponent } from './pages/authorization/authorization.component'
import { HeaderComponent } from './components/header/header.component'

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		CategoriesComponent,
		StatisticComponent,
		AuthorizationComponent,
		HeaderComponent
	],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
