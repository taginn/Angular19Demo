import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { loadItemsEffect } from './features/items/+state/items.effects';
import { ItemsFacade } from './features/items/+state/items.facade';
import * as fromItems from './features/items/+state/items.reducer';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects({ loadItemsEffect }),
    provideState(fromItems.ITEMS_FEATURE_KEY, fromItems.itemsReducer),
    ItemsFacade,
    provideStore(),
    provideEffects(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 }) // Optional delay for realism
    ),
  ],
};
