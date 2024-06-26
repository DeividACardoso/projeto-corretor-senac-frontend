import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoListagemComponent } from './veiculo-listagem.component';

describe('VeiculoListagemComponent', () => {
  let component: VeiculoListagemComponent;
  let fixture: ComponentFixture<VeiculoListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeiculoListagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VeiculoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
