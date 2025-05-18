import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsListComponent } from './items-list.component';
import { ItemsFacade } from './+state/items.facade';
import { of } from 'rxjs';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsListComponent],
      providers: [
        {
          provide: ItemsFacade,
          useValue: {
            allItems$: of([]),
            loaded$: of(true),
            selectedItems$: of(null),
            init: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ItemsListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
