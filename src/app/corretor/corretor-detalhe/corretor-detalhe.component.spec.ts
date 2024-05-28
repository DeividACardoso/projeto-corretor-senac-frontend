import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorretorDetalheComponent } from './corretor-detalhe.component';

describe('CorretorDetalheComponent', () => {
  let component: CorretorDetalheComponent;
  let fixture: ComponentFixture<CorretorDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorretorDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorretorDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
