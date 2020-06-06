import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  noHerrera( control: FormControl ): ErrorValidate {
    // El '?' significa que si existe el valor lo pase a LowerCase, sino, no!
    if ( control.value?.toLowerCase() === 'herrera' ) {
      return {
        noHerrera: true
      };
    }
    return null;
  }

  evaluarPassword( pass1Name: string, pass2Name: string ) {
    return ( form: FormGroup ) => {
      const pass1Control = form.controls[pass1Name];
      const pass2Control = form.controls[pass2Name];

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({
          noEsIgual: true
        });
      }
    };
  }

  existeUsuario( control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate> {

    if ( !control.value ) {
      return Promise.resolve(null);
    }

    return new Promise( ( resolve, reject ) => {
      setTimeout(() => {
        if ( control.value === 'evillasana' ) {
          resolve({ existe: true });
        } else {
          resolve( null );
        }
      }, 3500);
    });
  }
}
