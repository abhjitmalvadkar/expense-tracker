import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavListComponent } from './side-nav-list.component';

describe('SideNavListComponent', () => {
  let component: SideNavListComponent;
  let fixture: ComponentFixture<SideNavListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavListComponent]
    });
    fixture = TestBed.createComponent(SideNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
