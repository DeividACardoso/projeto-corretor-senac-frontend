import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegurosInspecaoComponent } from './seguros-inspecao.component';

describe('SegurosInspecaoComponent', () => {
  let component: SegurosInspecaoComponent;
  let fixture: ComponentFixture<SegurosInspecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegurosInspecaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SegurosInspecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
