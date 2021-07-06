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
  overviewChart!: Chart;
  canvas: any;
  ctx: any;
  date: any = [];
  totalrecovered: any = [];
  totaldeaths: any = [];
  totalcases: any = [];
  totalstats: any = [];

  ngAfterViewInit(): void {
  }

  private getOverviewStat(): any {
    let total;
    this.totalstats.length = 0;
    for(var x of [ this.totalcases, this.totaldeaths, this.totalrecovered ]) {
      total = 0;
      for (let i = 0; i < x.length; i++) {
        total += Number(x[i]);
      }
      this.totalstats.push(total);
    }
    return this.totalstats;
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

        let current = (<Chart>this.casesChart);
        if (current)
          current.destroy();
        this.casesChart = this.getCases('barChartCases', this.totalcases, this.date, "Total Cases");

        current = (<Chart>this.deathsChart);
        if (current)
          current.destroy();
        this.deathsChart = this.getCases('barChartDeaths', this.totaldeaths, this.date, "Total Deaths");

        current = (<Chart>this.recoveredChart);
        if (current)
          current.destroy();
        this.recoveredChart = this.getCases('barChartRecovered', this.totalrecovered, this.date, "Total Recovered");

        current = (<Chart>this.overviewChart);
        if (current)
          current.destroy();
        this.overviewChart = this.getCases('barChartOverview',  this.getOverviewStat(), ["Total cases", "Total deaths", "Total recovered"], "Corana Overview");
      });
  }

  public getCases(domvar: string, reqstatarr: any, xaxis: any, label:string): Chart {
    this.canvas = document.getElementById(domvar);
    this.ctx = this.canvas.getContext('2d');
    
    return new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: xaxis,
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



