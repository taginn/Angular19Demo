import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import {ItemsActions} from './items.actions';
import { ItemsEntity } from './items.models';

export const ITEMS_FEATURE_KEY = 'items';

export interface ItemsState extends EntityState<ItemsEntity> {
  selectedId?: string | number; // which Items record has been selected
  loaded: boolean; // has the Items list been loaded
  error?: string | null; // last known error (if any)
}

export interface ItemsPartialState {
  readonly [ITEMS_FEATURE_KEY]: ItemsState;
}

export const itemsAdapter: EntityAdapter<ItemsEntity> =
  createEntityAdapter<ItemsEntity>();

export const initialItemsState: ItemsState = itemsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialItemsState,
  on(ItemsActions.loadItems, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ItemsActions.loadItemsSuccess, (state, { items }) =>
    itemsAdapter.setAll(items, { ...state, loaded: true })
  ),
  on(ItemsActions.loadItemsFailure, (state, { error }) => ({ ...state, error }))
);

export function itemsReducer(state: ItemsState | undefined, action: Action) {
  return reducer(state, action);
}
