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

  get validarNombre() {
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }

  get validarApellido() {
    return this.formulario.get('apellido').invalid && this.formulario.get('apellido').touched;
  }

  get validarEmail() {
    return this.formulario.get('email').invalid && this.formulario.get('email').touched;
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: [ '', [ Validators.required, Validators.minLength(5) ] ],
      apellido: [ '', Validators.required ],
      email: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ] ]
    });
  }

  guardar() {
    if (this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    console.log(this.formulario);
  }

}
