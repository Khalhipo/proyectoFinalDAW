import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartjsVolumenComponent } from './chartjs-volumen.component';

describe('ChartjsVolumenComponent', () => {
  let component: ChartjsVolumenComponent;
  let fixture: ComponentFixture<ChartjsVolumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartjsVolumenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartjsVolumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
