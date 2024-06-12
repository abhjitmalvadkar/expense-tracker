import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedWrapperComponent } from './unauthenticated-wrapper.component';

describe('WrapperComponent', () => {
  let component: UnauthenticatedWrapperComponent;
  let fixture: ComponentFixture<UnauthenticatedWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnauthenticatedWrapperComponent]
    });
    fixture = TestBed.createComponent(UnauthenticatedWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
