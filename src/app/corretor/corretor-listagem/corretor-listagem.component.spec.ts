import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorretorListagemComponent } from './corretor-listagem.component';

describe('CorretorListagemComponent', () => {
  let component: CorretorListagemComponent;
  let fixture: ComponentFixture<CorretorListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorretorListagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorretorListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
