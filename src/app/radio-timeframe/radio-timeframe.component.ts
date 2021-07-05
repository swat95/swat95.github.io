import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-radio-timeframe',
  templateUrl: './radio-timeframe.component.html',
  styleUrls: ['./radio-timeframe.component.css']
})
export class RadioTimeframeComponent implements OnInit {

  /* Event emitted when radio button is selected */
  @Output() radioFrameSelected: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
  }

  public timeSelected!: number;
  public weekList: number[] = [1, 2, 3, 4]
  get selectedRadioframe(): number {
    return this.timeSelected;
  }

  onSelectedTimeframe(event: Event): void {
    this.radioFrameSelected.emit(this.selectedRadioframe);
  }

}
