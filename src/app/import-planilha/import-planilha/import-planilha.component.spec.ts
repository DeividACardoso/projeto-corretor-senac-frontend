import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPlanilhaComponent } from './import-planilha.component';

describe('ImportPlanilhaComponent', () => {
  let component: ImportPlanilhaComponent;
  let fixture: ComponentFixture<ImportPlanilhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportPlanilhaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportPlanilhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
