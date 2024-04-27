import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDetalheComponent } from './cliente-detalhe.component';

describe('ClienteDetalheComponent', () => {
  let component: ClienteDetalheComponent;
  let fixture: ComponentFixture<ClienteDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
