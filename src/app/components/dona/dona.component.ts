import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('chartLabels') doughnutChartLabels: string[] = [];
  // tslint:disable-next-line: no-input-rename
  @Input('chartData') doughnutChartData: number[] = [];
  // tslint:disable-next-line: no-input-rename
  @Input('chartType') doughnutChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
