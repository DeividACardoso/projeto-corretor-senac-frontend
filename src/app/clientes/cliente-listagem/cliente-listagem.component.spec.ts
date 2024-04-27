import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteListagemComponent } from './cliente-listagem.component';

describe('ClienteListagemComponent', () => {
  let component: ClienteListagemComponent;
  let fixture: ComponentFixture<ClienteListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteListagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
