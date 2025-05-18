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
    'should dispatch loadItemsSuccess with empty array when API returns null',
    marbles((m) => {
      itemsService.getItems.mockReturnValue(of([]));

      actions$ = m.hot('-a-', { a: ItemsActions.loadItems() });
      const expected = m.cold('-b-', {
        b: ItemsActions.loadItemsSuccess({ items: [] }),
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
