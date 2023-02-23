import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticChartComponent } from './statistic-chart.component';

describe('StatisticChartComponent', () => {
  let component: StatisticChartComponent;
  let fixture: ComponentFixture<StatisticChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
