import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilInfoComponent } from './soil-info.component';

describe('SoilInfoComponent', () => {
  let component: SoilInfoComponent;
  let fixture: ComponentFixture<SoilInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoilInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoilInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
