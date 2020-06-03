import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
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
