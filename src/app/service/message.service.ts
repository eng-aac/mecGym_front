import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  error(title: string, text: string){
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 2000
    })
  }

  confirmation(title: string, text: string){
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 2000
    })
  }
}
