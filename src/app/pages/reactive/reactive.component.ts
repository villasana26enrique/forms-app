import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';

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
    this.cargarInformacion();
  }

  ngOnInit(): void {
  }

  get obtenerPasatiempos() {
    return this.formulario.get('pasatiempos') as FormArray;
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

  get validarEstado() {
    return this.formulario.get('direccion.estado').invalid && this.formulario.get('direccion.estado').touched;
  }

  get validarCiudad() {
    return this.formulario.get('direccion.ciudad').invalid && this.formulario.get('direccion.ciudad').touched;
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: [ '', [ Validators.required, Validators.minLength(5) ] ],
      apellido: [ '', Validators.required ],
      email: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ] ],
      direccion: this.fb.group({
        estado: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    });
  }

  cargarInformacion() {
    this.formulario.reset({
      nombre: 'Enrique',
      apellido: 'Villasana',
      email: 'enrique.villasana26@gmail.com',
      direccion: {
        estado: 'Carabobo',
        ciudad: 'San Diego'
      }
    });

    ['Comer', 'Programar', 'Trabajar'].forEach( (valor: string) => {
      // tslint:disable-next-line: no-bitwise
      this.obtenerPasatiempos.push( this.fb.control( valor ) );
    });
  }

  guardar() {
    console.log(this.formulario);
    if (this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach(control => {

        // Se evalúa si el control es aninado (Como la dirección)
        if ( control instanceof FormGroup ) {
          Object.values(control.controls).forEach(controlGroup => {
            controlGroup.markAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      });
    }
    /* Aquí se deberia recibir la información correcta, es donde se debería enviar
    a un servicio o BD. Pero por los momentos solo haré un reset para limpiar el
    el formulario */
    this.formulario.reset( /*{ nombre: 'Enrique'}*/ );
  }

  agregarPasatiempo() {
    this.obtenerPasatiempos.push( this.fb.control(['']) );
  }

  borrarPasatiempo( index: number ) {
    this.obtenerPasatiempos.removeAt( index );
  }

}
