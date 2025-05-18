import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { ItemsActions } from './items.actions';
import { ItemsService } from '../items-service.service';
import { ItemsEntity } from './items.models';
import { ItemApiDto } from '../items-api-dto.model';

export const loadItemsEffect = createEffect(
  (actions$ = inject(Actions), itemsService = inject(ItemsService)) =>
    actions$.pipe(
      ofType(ItemsActions.loadItems),
      switchMap(() =>
        itemsService.getItems().pipe(
          map((items: ItemApiDto[]) => {
            if (!Array.isArray(items)) {
              items = [];
            }
            return ItemsActions.loadItemsSuccess({
              items: items.map(mapItems),
            });
          }),
          catchError((error) =>
            of(ItemsActions.loadItemsFailure({ error: error.message }))
          )
        )
      )
    ),
  { functional: true }
);

function mapItems(itemApi: ItemApiDto): ItemsEntity {
  return {
    id: itemApi.id,
    name: itemApi.name,
  };
}
