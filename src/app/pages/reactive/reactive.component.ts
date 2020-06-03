import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formulario: FormGroup;

  /* El FormBuilder nos ayudara a configurar el Formulario */
  constructor( private fb: FormBuilder ) {
    /* Se Inicializa el formulario en el constructor ya que se necesita
    que se inicialice antes de que se empiece a construir el HTML. Por
    eso no se inicializa en el ngOnInit*/
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: [ '', [ Validators.required, Validators.minLength(5) ] ],
      apellido: [ '', Validators.required ],
      email: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ] ]
    });
  }

  guardar() {
    console.log(this.formulario);
  }

}
