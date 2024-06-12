import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalPageNotFoundComponent } from './internal-page-not-found.component';

describe('InternalPageNotFoundComponent', () => {
  let component: InternalPageNotFoundComponent;
  let fixture: ComponentFixture<InternalPageNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternalPageNotFoundComponent]
    });
    fixture = TestBed.createComponent(InternalPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
