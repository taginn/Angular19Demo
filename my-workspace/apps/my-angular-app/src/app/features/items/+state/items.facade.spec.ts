import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ItemsFacade } from './items.facade';
import { ItemsActions } from './items.actions';
import * as ItemsSelectors from './items.selectors';

describe('ItemsFacade', () => {
  let facade: ItemsFacade;
  let store: MockStore;
  const initialState = {
    items: {
      loaded: false,
      entities: {},
      ids: [],
      selectedId: null,
      error: null,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemsFacade, provideMockStore({ initialState })],
    });

    facade = TestBed.inject(ItemsFacade);
    store = TestBed.inject(MockStore);
  });

  it('should dispatch loadItems action when init is called', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    facade.init();

    expect(dispatchSpy).toHaveBeenCalledWith(ItemsActions.loadItems());
  });

  it('should select loaded$ from the store', (done) => {
    store.overrideSelector(ItemsSelectors.selectItemsLoaded, true);

    facade.loaded$.subscribe((loaded) => {
      expect(loaded).toBe(true);
      done();
    });
  });

  it('should select allItems$ from the store', (done) => {
    const mockItems = [
      { id: '1', name: 'Item One' },
      { id: '2', name: 'Item Two' },
    ];
    store.overrideSelector(ItemsSelectors.selectAllItems, mockItems);

    facade.allItems$.subscribe((items) => {
      expect(items).toEqual(mockItems);
      done();
    });
  });

  it('should select selectedItems$ from the store', (done) => {
    const mockSelectedItem = { id: '1', name: 'Item One' };
    store.overrideSelector(ItemsSelectors.selectEntity, mockSelectedItem);

    facade.selectedItems$.subscribe((selectedItem) => {
      expect(selectedItem).toEqual(mockSelectedItem);
      done();
    });
  });
});
