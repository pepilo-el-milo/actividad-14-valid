import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Country } from 'src/models/Country';
import { Perfil } from 'src/models/Perfil';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'act-14-angular';
  paises: Country[] = [];
  
  error = true

  perfil: Perfil = {
    id: Math.floor(Math.random() * 100),
    name: '',
    apellidos: '',
    edad: 0,
    pais: '',
    ciudad: '',
    direccion: '',
    balance: 0
  };

  ciudades: string[] = [];
  country: Country = {
    iso2: '',
    iso3: '',
    country: '',
    cities: []
  };

  perfilForm: FormGroup = this.formBuilder.group({
    id: new FormControl({value: this.perfil.id, disabled: true}, [Validators.required]),
    name: new FormControl(this.perfil.name, [
      Validators.required,
      Validators.maxLength(30)
    ]),
    apellidos: new FormControl(this.perfil.apellidos, [
      Validators.required,
      Validators.maxLength(30)
    ]),
    edad: new FormControl(this.perfil.edad, [
      Validators.required,
      Validators.min(0)
    ]),
    pais: new FormControl(this.perfil.pais, [Validators.required]),
    ciudad: new FormControl(this.perfil.ciudad, [Validators.required]),
    direccion: new FormControl(this.perfil.direccion, [
      Validators.required,
      Validators.maxLength(100)
    ]),
    balance: new FormControl(this.perfil.balance, [
      Validators.required,
      Validators.min(0)
    ])
  });
  city: string = '';
  api: string = 'https://countriesnow.space/api/v0.1/countries';

  constructor(private http: HttpClient,private formBuilder: FormBuilder,){}

  selectPais() {
    this.perfilForm.get('pais')?.setValue(this.country.country)
    this.city = ''
    this.ciudades = this.country.cities
  }

  selectCiudad() {
    this.perfilForm.get('ciudad')?.setValue(this.city)
  }

  ngOnInit(){

    console.log("errores", this.perfilForm.errors)
    this.http.get<any>(this.api).subscribe(data => {
      this.paises = data.data
      console.log(this.paises.length)
      console.log(this.ciudades.length)
    })
  }

  submit(directive: FormGroupDirective){
    if (this.perfilForm.valid) {
      this.perfil.name = this.perfilForm.get('name')?.value
      this.perfil.apellidos = this.perfilForm.get('apellidos')?.value
      this.perfil.edad = this.perfilForm.get('edad')?.value
      this.perfil.pais = this.perfilForm.get('pais')?.value
      this.perfil.ciudad = this.perfilForm.get('ciudad')?.value
      this.perfil.direccion = this.perfilForm.get('direccion')?.value
      this.perfil.balance = this.perfilForm.get('balance')?.value

      alert("El formulario se ha enviado con éxito")
      this.perfilForm.reset()
      directive.resetForm()
      console.log(this.perfilForm)
    }
  }

  resetCountries(){
    this.city = ''
    this.ciudades = [];
    this.country = {
      iso2: '',
      iso3: '',
      country: '',
      cities: []
    };
  }

  
}
