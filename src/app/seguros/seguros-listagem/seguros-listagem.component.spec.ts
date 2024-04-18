import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegurosListagemComponent } from './seguros-listagem.component';

describe('SegurosListagemComponent', () => {
  let component: SegurosListagemComponent;
  let fixture: ComponentFixture<SegurosListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegurosListagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SegurosListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
