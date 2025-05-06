import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ItemsEntity } from './items.models';

export const ItemsActions = createActionGroup({
  source: 'Items/API',
  events: {
    'Load Items': emptyProps(),
    'Load Items Success': props<{ items: ItemsEntity[] }>(),
    'Load Items Failure': props<{ error: any }>(),
  },
});
