import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { ItemsFacade } from './+state/items.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ItemsListComponent {
  vm$: Observable<{ items: any[]; loaded: boolean; selected: any }>;

  constructor(private itemsFacade: ItemsFacade) {
    this.vm$ = combineLatest([
      this.itemsFacade.allItems$,
      this.itemsFacade.loaded$,
      this.itemsFacade.selectedItems$,
    ]).pipe(
      map(([items, loaded, selected]) => ({
        items,
        loaded,
        selected,
      }))
    );

    this.itemsFacade.init();
  }
}
