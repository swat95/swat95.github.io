import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioTimeframeComponent } from './radio-timeframe.component';

describe('RadioTimeframeComponent', () => {
  let component: RadioTimeframeComponent;
  let fixture: ComponentFixture<RadioTimeframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadioTimeframeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioTimeframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
