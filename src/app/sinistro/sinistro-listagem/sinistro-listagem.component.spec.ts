import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinistroListagemComponent } from './sinistro-listagem.component';

describe('SinistroListagemComponent', () => {
  let component: SinistroListagemComponent;
  let fixture: ComponentFixture<SinistroListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinistroListagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinistroListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
