import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDadosComponent } from './cliente-dados.component';

describe('ClienteDadosComponent', () => {
  let component: ClienteDadosComponent;
  let fixture: ComponentFixture<ClienteDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteDadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
