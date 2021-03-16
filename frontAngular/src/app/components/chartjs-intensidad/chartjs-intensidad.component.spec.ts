import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartjsIntensidadComponent } from './chartjs-intensidad.component';

describe('ChartjsIntensidadComponent', () => {
  let component: ChartjsIntensidadComponent;
  let fixture: ComponentFixture<ChartjsIntensidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartjsIntensidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartjsIntensidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
