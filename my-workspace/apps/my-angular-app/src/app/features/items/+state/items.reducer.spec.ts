import { Action } from '@ngrx/store';

import { ItemsActions } from './items.actions';
import { ItemsEntity } from './items.models';
import { ItemsState, initialItemsState, itemsReducer } from './items.reducer';

describe('Items Reducer', () => {
  const createItemsEntity = (id: string, name = ''): ItemsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Items actions', () => {
    it('loadItems should set loaded to false', () => {
      const action = ItemsActions.loadItems();

      const result: ItemsState = itemsReducer(initialItemsState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });

    it('loadItemsSuccess should populate the items and set loaded to true', () => {
      const items = [
        createItemsEntity('PRODUCT-AAA'),
        createItemsEntity('PRODUCT-zzz'),
      ];
      const action = ItemsActions.loadItemsSuccess({ items });

      const result: ItemsState = itemsReducer(initialItemsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
      expect(result.entities['PRODUCT-AAA']).toEqual(items[0]);
      expect(result.entities['PRODUCT-zzz']).toEqual(items[1]);
    });

    it('loadItemsFailure should set the error message', () => {
      const error = 'Failed to load items';
      const action = ItemsActions.loadItemsFailure({ error });

      const result: ItemsState = itemsReducer(initialItemsState, action);

      expect(result.error).toBe(error);
      expect(result.loaded).toBe(false);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = itemsReducer(initialItemsState, action);

      expect(result).toBe(initialItemsState);
    });
  });
});
