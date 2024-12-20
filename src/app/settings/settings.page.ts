import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {





  constructor() { }

  rodadosEtanol: any;
  abastecidosEtanol: any;
  rodadosGas: any;
  abastecidosGas: any;


  desempEtanol() {
    throw new Error('Method not implemented.');
    }

  desempGas() {
    throw new Error('Method not implemented.');
    }
    
}
