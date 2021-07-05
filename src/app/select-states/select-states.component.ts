import { Component, OnInit } from '@angular/core';
import { States } from '../states';
import { StatesService } from '../states.service';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { Dates } from '../dates';

@Component({
  selector: 'app-select-states',
  templateUrl: './select-states.component.html',
  styleUrls: ['./select-states.component.css']
})
export class SelectStatesComponent implements OnInit {

  constructor(private _statesService: StatesService,
    private _chartComp: BarChartComponent
  ) { }

  lstStates: States[] = [];
  lstDates: Dates[] = [];
  timeframe: number = 1 * 7;
  public stateSelected: any;
  chart: any;

  ngOnInit(): void {

    this._statesService.getStates()
      .subscribe(
        (data: any) => {
          Object.keys(data.data).forEach(k => {
            this.lstStates.push(data.data[k])
          })
        }
      );
  }

  ngAfterViewInit() {
  }

  onRadioSelect(timeframe: number): void {
    this.timeframe = timeframe * 7;
    if (this.stateSelected)
      this._chartComp.getData(this.stateSelected, this.timeframe);
  }

  onSelectedState(event: Event): void {
    let state: any = (<HTMLInputElement>event.target).value

    for (let i = 0; i < this.lstStates.length; i++) {
      if (state == this.lstStates[i].id) {
        this.stateSelected = state;
        this._chartComp.getData(state, this.timeframe)
        break;
      }
    }
  }
}
