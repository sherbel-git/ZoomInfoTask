import {Component, Input, Output, OnDestroy, OnInit, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {PaginationData} from './classes/pagination-data';
import {DataTableCriteria} from './classes/data-table-criteria';
import {DataTableResponse} from './classes/data-table-response';
import {DataTableColumn} from './classes/data-table-column';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  animations: [
    trigger('rotate', [
      state('inactive', style({
        transform: 'rotate(0)',
      })),
      state('active', style({
        transform: 'rotate(180deg)',
      })),
      transition('active => inactive', animate('200ms')),
      transition('inactive => active', animate('200ms'))
    ]),
    trigger('fade', [
      state('inactive', style({
        display: 'none',
        opacity: '0',
      })),
      state('active', style({
        display: '*',
        opacity: '1',
      })),
      transition('active => inactive', animate('200ms')),
      transition('inactive => active', animate('200ms'))
    ])
  ]
})
export class DataTableComponent implements OnInit, OnDestroy {

  @Input() tableName: string;
  @Input() columns: DataTableColumn[] = [];
  @Input() formUrl: string;
  @Input() hasActionsHeader = true;
  @Input() showSearch = true;
  @Input() limit = 2;
  @Input() isSelectable = false;
  @Input() paginationClass: string;

  @Output() fetchItems = new EventEmitter<boolean>();

  items: object[] = [];
  sub = new Subscription();
  criteria = new DataTableCriteria();
  paginationData = new PaginationData(this.limit);
  isSearchActive: boolean;
  isLoading: boolean;
  savedItem: string;
  sortOrder: number ;
  config: any;

  constructor(protected router: Router, protected route: ActivatedRoute) {
  }

  ngOnInit() {


    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.items.length
    };




    this.sortOrder = -1;
  }

  loadItems(): void {
    this.isLoading = true;
    this.fetchItems.emit(true);
  }

  setItems(response: DataTableResponse): void {
    this.isLoading = false;
    console.log(response);
    this.items = response && response.items ? response.items : [];
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }


  compare( a, b ) {
    let comparison = 0;
    if ( a.firstName < b.firstName ) {
      comparison = -1;
      // return (-1);
    }
    if ( a.firstName > b.firstName ) {
      comparison = 1;
    }
    return comparison;
  }
  compare2( a, b ) {
    let comparison = 0;
    if ( a.firstName < b.firstName ) {
      comparison = 1;
      // return (-1);
    }
    if ( a.firstName > b.firstName ) {
      comparison = -1;
    }
    return comparison;
  }

  sortItems(property, order): void {
    this.sortOrder = -this.sortOrder;
    if (this.sortOrder > 0 ) {
    this.items.sort(this.compare);
    } else {
      this.items.sort(this.compare2);
    }
  }

  checkSavedItem(key: string): void {
    if (sessionStorage.getItem(key)) {
      this.savedItem = sessionStorage.getItem(key);
      sessionStorage.removeItem(key);
    }
  }

  search(event?: KeyboardEvent): void {
    if (((event && (event.code === 'Enter' || event.code === 'NumpadEnter')) || !event) && !this.isLoading) {
      this.isSearchActive = !!this.criteria.keyword || Object.keys(this.criteria.filters).length > 0;
      this.loadItems();
    }
  }



  extendedSearch(values: object): void {
    this.criteria.filters = values;

    if (this.criteria.page > 1) {
      this.criteria.page = 1;
      this.paginationData.currentPage = this.criteria.page;

      const url: string = this.router.url.substring(0, this.router.url.indexOf('?'));
      this.router.navigateByUrl(url);
    } else {
      this.search();
    }
  }


  rotateSortingIcon(): string {
    return (this.criteria.sort.direction === 'DESC') ? 'inactive' : 'active';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
