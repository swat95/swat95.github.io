import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectStatesComponent } from './select-states/select-states.component';
import { StatesService } from './states.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { RadioTimeframeComponent } from './radio-timeframe/radio-timeframe.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    SelectStatesComponent,
    BarChartComponent,
    RadioTimeframeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    MatRadioModule
  ],
  providers: [StatesService,
    BarChartComponent,
    SelectStatesComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
