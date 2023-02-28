import { Component, OnInit } from '@angular/core'
import { Color } from 'src/types/Color'
import { ColorsActions, selectColors } from 'src/app/store/colors'
import { Store } from '@ngrx/store'
import { RootState } from 'src/app/store'

@Component({
	selector: 'app-perf',
	templateUrl: './perf.component.html'
})
export class PerfComponent implements OnInit {
	colors: Color[] = []

	constructor(private store: Store<RootState>) {
		store.select(selectColors).subscribe(newColors => {
			this.colors = newColors
		})
	}

	ngOnInit() {
		this.store.dispatch(ColorsActions.loadColors())

		// setInterval(() => {
		// 	this.store.dispatch(ColorActions.loadColors())
		// 	console.log('123')
		// }, 1000)
	}
}
