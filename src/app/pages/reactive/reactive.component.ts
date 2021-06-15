import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma:FormGroup;

  constructor(private fb: FormBuilder, private validadores:ValidadoresService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    //regresa un boleano
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }
  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }
  get distritoNoValido() {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
  }
  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
  }
  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }
  get pas1NoValido(){
    return this.forma.get('pas1').invalid && this.forma.get('pas1').touched
  }
  get pas2NoValido():boolean{
    const pas1 = this.forma.get('pas1').value;
    const pas2 = this.forma.get('pas2').value;
    if(pas1 === pas2){
      return false;
    } else
      return true;
  }
  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }

  crearFormulario(){
    this.forma = this.fb.group({
      //Definimos nuestro formulario
      //posicion 0:valor por defecto, posicion 1:validacion sincrona,posicion 2:validacion asincrona
      nombre: ['', [Validators.required,Validators.minLength(5)] ],
      apellido: ['',[Validators.required, this.validadores.noCabrera] ],
      correo: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['',,this.validadores.existeUsuario],
      pas1: ['',Validators.required],
      pas2: ['',Validators.required],
      direccion: this.fb.group({
        distrito: ['',Validators.required],
        ciudad: ['',Validators.required]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: [this.validadores.passwordsIguales('pas1','pas2')]
    });
  }

  cargarDataAlFormulario(){
    this.forma.setValue({
      nombre: 'Alfredo',
      apellido: 'Herrera',
      correo: 'sed.silver@hotmail.com',
      usuario: '',
      pas1: '',
      pas2:'',
      direccion:{
        distrito: 'Azcapo',
        ciudad: 'CDMX'
      },
      pasatiempos: [
        
      ]
    })
  }
  crearListeners(){
    //son observers que nos sirven para saber si hay cambios en algun lugar del formulario
    /* this.forma.valueChanges.subscribe(valor => console.log(valor))
    this.forma.statusChanges.subscribe(status => console.log(status)) */
    this.forma.get('nombre').valueChanges.subscribe(valor => console.log(valor))
  }
  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control(''))
  }
  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }

  guardar(){
    //lo unico que hacemos es tocar todos los elementos del formulario
    console.log(this.forma);
    if( this.forma.invalid) {
      return Object.values( this.forma.controls ).forEach( control => {
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAsTouched())
        } else
          control.markAsTouched();
      })
    }
    //Reseteamos y eliminamos campos del formulario
    this.forma.reset({
      nombre:'Sin nombre'
    });
  }  
}
