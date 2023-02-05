import { Component, OnInit } from '@angular/core'
import { Statistic } from 'src/types/Statistic'
import { ApiService } from '../../services/api.service'

@Component({
	selector: 'app-statistic',
	templateUrl: './statistic.component.html',
	styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
	statistics: Statistic[] | null = null

	ngOnInit() {
		this.api.getAllStatisticRecords().subscribe(statistics => {
			this.statistics = statistics
		})
	}

	constructor(private api: ApiService) {}
}
