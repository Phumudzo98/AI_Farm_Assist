import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PestDiseaseComponent } from './pest-disease.component';

describe('PestDiseaseComponent', () => {
  let component: PestDiseaseComponent;
  let fixture: ComponentFixture<PestDiseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PestDiseaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PestDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
