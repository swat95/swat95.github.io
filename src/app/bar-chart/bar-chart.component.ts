import { AfterViewInit, Component } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StatesService } from '../states.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements AfterViewInit {

  constructor(private _stateService: StatesService) { }

  casesChart!: Chart;
  deathsChart!: Chart;
  recoveredChart!: Chart;
  canvas: any;
  ctx: any;
  date: any = [];
  totalrecovered: any = [];
  totaldeaths: any = [];
  totalcases: any = [];


  ngAfterViewInit(): void {
  }

  /**
   * Call service to get the corona stat from a specific state of Deutschland
   * @stateid : State id to retrieve
   * @timeframe: Timeframe of data. Eg: Past 1 week, 2 weeks
   * @return: void
  */
  public getData(stateid: number, timeframe: number): void {
    this._stateService
      .getTimeseriesGermany(stateid, timeframe)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.totalcases.length = 0;
        this.totaldeaths.length = 0;
        this.totalrecovered.length = 0;
        this.date.length = 0;
        for (let i = 0; i < response.length; i++) {
          this.totalcases.push(response[i].totalcases)
          this.totalrecovered.push(response[i].totalrecovered)
          this.totaldeaths.push(response[i].totaldeath)
          this.date.push(response[i].date)
        }
        console.log(response)
        console.log(this.date);
        let current = (<Chart>this.casesChart);
        if (current)
          current.destroy();
        this.casesChart = this.getCases('barChartCases', this.totalcases, "Total Cases");

        current = (<Chart>this.deathsChart);
        if (current)
          current.destroy();
        this.deathsChart = this.getCases('barChartDeaths', this.totaldeaths, "Total Deaths");

        current = (<Chart>this.recoveredChart);
        if (current)
          current.destroy();
        this.recoveredChart = this.getCases('barChartRecovered', this.totalrecovered, "Total Recovered");

      });
  }

  public getCases(domvar: string, reqstatarr: any, label:string): Chart {
    this.canvas = document.getElementById(domvar);
    this.ctx = this.canvas.getContext('2d');
    let total=0;

    /* Display total stat numbers in the label */
    for (let i = 0; i < reqstatarr.length; i++) {
      total += Number(reqstatarr[i]);
    }
    console.log(total);
    return new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.date,
        datasets: [
          {
            label: label,
            data: reqstatarr,
            backgroundColor: "#2a4b7c",
            hoverBackgroundColor: "#2a7c1b"
          }
        ],
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{ display: true }],
          yAxes: [{ display: true }]
        }
      }
    })
  }
}



