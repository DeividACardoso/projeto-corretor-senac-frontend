import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinistroDetalheComponent } from './sinistro-detalhe.component';

describe('SinistroDetalheComponent', () => {
  let component: SinistroDetalheComponent;
  let fixture: ComponentFixture<SinistroDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinistroDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinistroDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
