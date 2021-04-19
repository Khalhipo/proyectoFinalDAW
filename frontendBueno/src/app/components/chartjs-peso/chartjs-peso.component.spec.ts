import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartjsPesoComponent } from './chartjs-peso.component';

describe('ChartjsPesoComponent', () => {
  let component: ChartjsPesoComponent;
  let fixture: ComponentFixture<ChartjsPesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartjsPesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartjsPesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
