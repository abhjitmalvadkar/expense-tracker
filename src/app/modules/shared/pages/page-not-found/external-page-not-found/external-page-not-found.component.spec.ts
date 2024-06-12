import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalPageNotFoundComponent } from './external-page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: ExternalPageNotFoundComponent;
  let fixture: ComponentFixture<ExternalPageNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExternalPageNotFoundComponent]
    });
    fixture = TestBed.createComponent(ExternalPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
