import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items = [
      { id: 1, name: 'Item One', description: 'First item description' },
      { id: 2, name: 'Item Two', description: 'Second item description' },
      { id: 3, name: 'Item Three', description: 'Third item description' },
    ];

    const users = [
      { id: 1, username: 'alice', email: 'alice@example.com' },
      { id: 2, username: 'bob', email: 'bob@example.com' },
    ];

    return { items, users };
  }
}
