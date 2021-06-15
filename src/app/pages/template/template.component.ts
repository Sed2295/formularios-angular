import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  usuario= {
    nombre: 'Alfredo',
    apellido: 'Cabrera',
    correo: 'sed.silver@hotmail.com',
    pais: 'CRI'
  }
  paises: any[] = [];
  constructor( private paisService:PaisService ) {}

  ngOnInit(): void {
    this.paisService.getpaises()
      .subscribe( paises => {
        this.paises = paises;
        //agregamos un objeto a la primera posicion del arreglo
        /*  this.paises.unshift({
          pais: 'Seleccione una opción',
          codigo: ''
        })      */    
        console.log( this.paises );
      })
  }
  guardar(forma: NgForm){
    console.log(forma)
    //Codigo para activar las validaciones en caso de que el formulario sea invalido
    if( forma.invalid) {
      Object.values( forma.controls ).forEach( control => {
        control.markAsTouched();
      })
    }
  }

}
