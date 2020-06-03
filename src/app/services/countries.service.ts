import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) {
    console.log('Servicio Listo');
  }

  getCountries$() {
    return this.http.get('https://restcountries.eu/rest/v2/lang/es').pipe(
      map( (countries: any[]) => {
        return countries.map( country => {
          return {
            name: country.name,
            code: country.alpha3Code
          };
        });
      })
    );
  }
}
