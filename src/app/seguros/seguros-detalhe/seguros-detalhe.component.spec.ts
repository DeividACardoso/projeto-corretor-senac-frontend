import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguroDetalheComponent } from './seguros-detalhe.component';

describe('SegurosDetalheComponent', () => {
  let component: SeguroDetalheComponent;
  let fixture: ComponentFixture<SeguroDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguroDetalheComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SeguroDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
