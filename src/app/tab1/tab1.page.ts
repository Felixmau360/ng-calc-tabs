import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  desempetanol:number = NaN;
  desempgas:number = NaN;
  precogas:number = NaN;
  precoetanol:number = NaN;
  consumoetanol:number = NaN;
  consumogas:number = NaN;
  resultado:string ="";


  constructor(private dataService: DataService) {}

  async ngOnInit() {
    await this.dataService.loadStoredValues();

    this.dataService.desempEtanol$.subscribe(valor => {
      this.desempetanol = valor;
    });

    this.dataService.desempGas$.subscribe(valor => {
      this.desempgas = valor;
    });
  }
  

  isAlertOpen = false;
  alertButtons = ['Ok'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  
 funcao(){

   this.consumoetanol = this.precoetanol / this.desempetanol;
   this.consumogas = this.precogas / this.desempgas;
 
   if (this.consumoetanol < this.consumogas) {
       this.resultado = "Abasteça com Etanol";
     } 
   else if (this.consumoetanol > this.consumogas) {
       this.resultado = "Abasteça com Gasolina";
     } 
   else {
       this.resultado = "Use o Combustível de sua preferência.";
     }
   }
}
