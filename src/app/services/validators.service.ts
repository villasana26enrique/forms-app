import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  noHerrera( control: FormControl ): {[s: string]: boolean} {
    // El '?' significa que si existe el valor lo pase a LowerCase, sino, no!
    if ( control.value?.toLowerCase() === 'herrera' ) {
      return {
        noHerrera: true
      };
    }
    return null;
  }
}
