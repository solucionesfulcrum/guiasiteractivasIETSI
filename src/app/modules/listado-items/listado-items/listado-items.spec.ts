import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoItems } from './listado-items';

describe('ListadoItems', () => {
  let component: ListadoItems;
  let fixture: ComponentFixture<ListadoItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoItems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
