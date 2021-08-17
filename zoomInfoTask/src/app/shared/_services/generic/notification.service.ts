import { Injectable } from '@angular/core';

import * as _swal from 'sweetalert2';
import { SweetAlert } from 'sweetalert2/src/instanceMethods';

const swal: SweetAlert = _swal as any;

@Injectable()
export class NotificationService {

  public success(title?: string, text?: string, extraOptions?: object): void {
    title = title ? title : 'הפעולה בוצעה בהצלחה';
    let options = {
      position: 'center',
      icon: 'success',
      title,
      text: text ? text : '',
      confirmButtonText: 'אישור',
      timer: 2500
    };

    if (extraOptions) {
      options = Object.assign(options, extraOptions);
    }

    swal.fire(options);
  }

  public error(text?: string, title?: string, extraOptions?: object): void {
    let options = {
      icon: 'error',
      title: title ? title : 'אירעה שגיאה',
      text,
      confirmButtonText: 'סגור'
    };

    if (extraOptions) {
      options = Object.assign(options, extraOptions);
    }

    swal.fire(options);
  }

  public warning(title?: string, text?: string, extraOptions?: object): Promise<any> {
    let options = {
      title: title ? title : 'האם אתה בטוח?',
      text: text ? text : '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'אישור',
      cancelButtonText: 'ביטול'
    };

    if (extraOptions) {
      options = Object.assign(options, extraOptions);
    }

    return swal.fire(options);
  }

  public info(title: string, text?: string, extraOptions?: object): Promise<any> {
    let options = {
      title,
      text: text ? text : '',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'אישור',
      cancelButtonText: 'ביטול'
    };

    if (extraOptions) {
      options = Object.assign(options, extraOptions);
    }

    return swal.fire(options);
  }

  public serverError(): void {
    return this.error('שגיאת שרת, נסה שנית או צור קשר.');
  }
}
