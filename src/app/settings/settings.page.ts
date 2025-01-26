import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {

  constructor( private router:Router, private dataService: DataService) { }

  rodadosEtanol: any;
  abastecidosEtanol: any;
  rodadosGas: any;
  abastecidosGas: any;
  desempetanol: any;
  desempgas: any;


  desempenho() {
    this.dataService.setDesempEtanol(this.desempetanol = Number((this.rodadosEtanol / this.abastecidosEtanol).toFixed(2)));
    this.dataService.setDesempGas(this.desempgas = Number((this.rodadosGas / this.abastecidosGas).toFixed(2)));
    this.router.navigate(['/tabs/tab1']);
    }
  

  registroCOMcomp() {
    this.dataService.setDesempEtanol(this.desempetanol);
    this.dataService.setDesempGas(this.desempgas);
    this.router.navigate(['/tabs/tab1']);
    }

  
    
}
