import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { ItemsActions } from './items.actions';
import { ItemsService } from '../items-service.service';

export const loadItemsEffect = createEffect(
  (actions$ = inject(Actions), itemsService = inject(ItemsService)) =>
    actions$.pipe(
      ofType(ItemsActions.loadItems),
      switchMap(() =>
        itemsService.getItems().pipe(
          map((items) => ItemsActions.loadItemsSuccess({ items })),
          catchError((error) =>
            of(ItemsActions.loadItemsFailure({ error: error.message }))
          )
        )
      )
    ),
  { functional: true }
);
