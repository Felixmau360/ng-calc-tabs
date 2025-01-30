import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {


  constructor( private router:Router, 
               private dataService: DataService,
               private alertController: AlertController) { }

  rodadosEtanol: any;
  abastecidosEtanol: any;
  rodadosGas: any;
  abastecidosGas: any;
  desempetanol: any;
  desempgas: any;


  async desempenho() {
    if (!this.rodadosEtanol || !this.abastecidosEtanol || !this.rodadosGas || !this.abastecidosGas) {
      const alert = await this.alertController.create({
        header: 'Atenção',
        message: 'Todos os campos devem ser preenchidos para calcular o desempenho',
        buttons: ['OK'],
        cssClass: 'custom-alert'
      });
      await alert.present();
      return;
    }

    this.dataService.setDesempEtanol(this.desempetanol = Number((this.rodadosEtanol / this.abastecidosEtanol).toFixed(2)));
    this.dataService.setDesempGas(this.desempgas = Number((this.rodadosGas / this.abastecidosGas).toFixed(2)));
    this.router.navigate(['tabs/tab1']);
  }
  

  async registroCOMcomp() {
      if (!this.desempetanol || !this.desempgas) {
        const alert = await this.alertController.create({
          header: 'Atenção',
          message: 'Insira os valores de desempenho para Etanol e Gasolina',
          buttons: ['OK'],
          cssClass: 'custom-alert'
        });
        await alert.present();
        return;
      }

    this.dataService.setDesempEtanol(this.desempetanol);
    this.dataService.setDesempGas(this.desempgas);
    this.router.navigate(['tabs/tab1']);
    }
}
