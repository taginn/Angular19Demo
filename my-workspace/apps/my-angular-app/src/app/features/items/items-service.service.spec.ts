import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ItemsService } from './items-service.service';

describe('ItemsService', () => {
  let service: ItemsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemsService],
    });

    service = TestBed.inject(ItemsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch items via GET', () => {
    const mockItems = [
      { id: 1, name: 'Item One', description: 'First item description' },
      { id: 2, name: 'Item Two', description: 'Second item description' },
    ];

    service.getItems().subscribe((items) => {
      expect(items).toEqual(mockItems);
    });

    const req = httpMock.expectOne('/api/items');
    expect(req.request.method).toBe('GET');
    req.flush(mockItems); // Simulate a successful response
  });

  it('should handle HTTP errors', () => {
    const errorMessage = 'Failed to load items';

    service.getItems().subscribe(
      () => fail('Expected an error, not items'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );

    const req = httpMock.expectOne('/api/items');
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
