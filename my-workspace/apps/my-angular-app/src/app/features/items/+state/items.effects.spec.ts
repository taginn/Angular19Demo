import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ItemsActions } from './items.actions';
import { loadItemsEffect } from './items.effects';
import { ItemsService } from '../items-service.service';
import { marbles } from 'rxjs-marbles/jest';

describe('loadItemsEffect', () => {
  let actions$: Observable<any>;
  let itemsService: jest.Mocked<ItemsService>;

  beforeEach(() => {
    const mockItemsService = {
      getItems: jest.fn(),
      apiUrl: '', // Mock required properties
      http: jest.fn(), // Mock required properties
    } as unknown as jest.Mocked<ItemsService>; // Cast to jest.Mocked<ItemsService>

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        { provide: ItemsService, useValue: mockItemsService },
      ],
    });

    itemsService = TestBed.inject(ItemsService) as jest.Mocked<ItemsService>;
  });

  it(
    'should dispatch loadItemsSuccess when items are loaded successfully',
    marbles((m) => {
      const mockItems = [
        { id: 1, name: 'Item One', description: 'First item description' },
        { id: 2, name: 'Item Two', description: 'Second item description' },
      ];
      itemsService.getItems.mockReturnValue(of(mockItems));

      actions$ = m.hot('-a-', {
        a: ItemsActions.loadItems(),
      }) as Observable<any>;
      const expected = m.cold('-b-', {
        b: ItemsActions.loadItemsSuccess({ items: mockItems }),
      });

      const effect = loadItemsEffect(actions$, itemsService);

      m.expect(effect).toBeObservable(expected);
    })
  );

  it(
    'should dispatch loadItemsFailure when there is an error',
    marbles((m) => {
      const error = new Error('Failed to load items');
      itemsService.getItems.mockReturnValue(throwError(() => error));

      actions$ = m.hot('-a-', { a: ItemsActions.loadItems() });
      const expected = m.cold('-b-', {
        b: ItemsActions.loadItemsFailure({ error: error.message }),
      });

      const effect = loadItemsEffect(actions$, itemsService);

      m.expect(effect).toBeObservable(expected);
    })
  );
});
