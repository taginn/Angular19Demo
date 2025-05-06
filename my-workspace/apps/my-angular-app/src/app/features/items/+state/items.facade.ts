import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import {ItemsActions} from './items.actions';
import * as ItemsSelectors from './items.selectors';

@Injectable()
export class ItemsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ItemsSelectors.selectItemsLoaded));
  allItems$ = this.store.pipe(select(ItemsSelectors.selectAllItems));
  selectedItems$ = this.store.pipe(select(ItemsSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ItemsActions.loadItems());
  }
}
