import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguradoraListagemComponent } from './seguradora-listagem.component';

describe('SeguradoraListagemComponent', () => {
  let component: SeguradoraListagemComponent;
  let fixture: ComponentFixture<SeguradoraListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguradoraListagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeguradoraListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
