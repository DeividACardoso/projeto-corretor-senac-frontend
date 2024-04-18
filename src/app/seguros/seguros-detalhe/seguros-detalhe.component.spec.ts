import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegurosDetalheComponent } from './seguros-detalhe.component';

describe('SegurosDetalheComponent', () => {
  let component: SegurosDetalheComponent;
  let fixture: ComponentFixture<SegurosDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegurosDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SegurosDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
