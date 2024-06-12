import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOnSelectComponent } from './search-on-select.component';

describe('SearchOnSelectComponent', () => {
  let component: SearchOnSelectComponent;
  let fixture: ComponentFixture<SearchOnSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOnSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchOnSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
