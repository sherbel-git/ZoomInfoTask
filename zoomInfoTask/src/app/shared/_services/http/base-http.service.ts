import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable()
export abstract class BaseHttpService {

  readonly apiUrl = environment.apiUrl;

  getBlobRequest(params?: any): { responseType: 'blob' } {
    const request: { responseType: 'blob', params?: HttpParams } = {
      responseType: 'blob'
    };

    if (params) {
      request.params = new HttpParams({ fromObject: params } );
    }

    return request;
  }

  setDataTableParams(criteria, params?: object): object {
    const formattedParams = {
      ...criteria.filters,
      ...params,
      sortBy: criteria.sort.column,
      sortDir: criteria.sort.direction,
      page: criteria.page,
      keyword: '',
      isCheckAll: false
    };

    if (criteria.keyword) {
      formattedParams.keyword = criteria.keyword;
    }

    if (criteria.isCheckAll) {
      formattedParams.isCheckAll = criteria.isCheckAll;
    }

    return formattedParams;
  }
}
