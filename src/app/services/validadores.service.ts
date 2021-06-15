import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})

export class ValidadoresService {
  

  constructor() {}

  //creo un metodo llamado no cabrera y su salida va a ser un objeto y dentro un string de tipo boleano
  noCabrera(control:FormControl):ErrorValidate{
    if(control.value?.toLowerCase() === 'cabrera'){
      return {
        noCabrera: true
      }
    } else
      return null;    
  }
  

  passwordsIguales(pass1:string,pass2:string): ValidationErrors | null{
    return (formGroup:FormGroup) => {
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];
      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEsIgual:true});
      }
    }
  }
  //validacion asincrona
  existeUsuario(control:FormControl): Promise<ErrorValidate> | Observable<ErrorValidate>{
    //codigo para que no se ejecute el timeout al momento de cargar el formulario
    if(!control.value)
      return Promise.resolve(null);
    return new Promise( (resolve,reject)=> {
      setTimeout( () => {
        if(control.value === 'strider'){
          resolve({existe:true})
        }else
          resolve(null)
      },3500)
    })
  }
}
