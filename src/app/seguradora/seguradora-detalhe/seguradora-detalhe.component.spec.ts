import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguradoraDetalheComponent } from './seguradora-detalhe.component';

describe('SeguradoraDetalheComponent', () => {
  let component: SeguradoraDetalheComponent;
  let fixture: ComponentFixture<SeguradoraDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguradoraDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeguradoraDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
