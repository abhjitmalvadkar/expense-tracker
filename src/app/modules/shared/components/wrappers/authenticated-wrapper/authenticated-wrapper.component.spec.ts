import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedWrapperComponent } from './authenticated-wrapper.component';

describe('AuthenticatedWrapperComponent', () => {
  let component: AuthenticatedWrapperComponent;
  let fixture: ComponentFixture<AuthenticatedWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticatedWrapperComponent]
    });
    fixture = TestBed.createComponent(AuthenticatedWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
