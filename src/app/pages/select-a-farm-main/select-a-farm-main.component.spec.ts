import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAFarmMainComponent } from './select-a-farm-main.component';

describe('SelectAFarmMainComponent', () => {
  let component: SelectAFarmMainComponent;
  let fixture: ComponentFixture<SelectAFarmMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectAFarmMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAFarmMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
