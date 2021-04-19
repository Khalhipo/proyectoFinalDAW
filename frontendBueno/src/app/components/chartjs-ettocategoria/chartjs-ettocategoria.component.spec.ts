import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartjsEttocategoriaComponent } from './chartjs-ettocategoria.component';

describe('ChartjsEttocategoriaComponent', () => {
  let component: ChartjsEttocategoriaComponent;
  let fixture: ComponentFixture<ChartjsEttocategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartjsEttocategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartjsEttocategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
