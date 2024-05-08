import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemComponent } from './listagem.component';

describe('ListagemComponent', () => {
  let component: ListagemComponent;
  let fixture: ComponentFixture<ListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
