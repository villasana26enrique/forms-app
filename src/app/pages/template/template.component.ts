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
    email: 'enrique.villasana26@gmail.com'
  };

  constructor( private countries: CountriesService) { }

  ngOnInit(): void {
    this.countries.getCountries$().subscribe( resp => console.log(resp) );
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
