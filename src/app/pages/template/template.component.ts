import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Enrique',
    apellido: 'Villasana',
    email: 'enrique.villasana26@gmail.com',
    pais: ''
  };

  paises: any[] = [];

  constructor( private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countriesService.getCountries$().subscribe( paises => {
      this.paises = paises;
      this.paises.unshift({
        name: 'Seleccione un País',
        code: ''
      });
      console.log(this.paises);
    });
  }

  save(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    console.log(form.value);
  }
}
