import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteInspecaoComponent } from './cliente-inspecao.component';

describe('ClienteInspecaoComponent', () => {
  let component: ClienteInspecaoComponent;
  let fixture: ComponentFixture<ClienteInspecaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteInspecaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteInspecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
