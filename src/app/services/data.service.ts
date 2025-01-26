import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private desempEtanolSource = new BehaviorSubject<number>(0);
  private desempGasSource = new BehaviorSubject<number>(0);

  desempEtanol$ = this.desempEtanolSource.asObservable();
  desempGas$ = this.desempGasSource.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async  setDesempEtanol(valor: number) {
    await this.storage.set('desempEtanol', valor);
    this.desempEtanolSource.next(valor);
  }

  async setDesempGas(valor: number) {
    await this.storage.set('desempGas', valor);
    this.desempGasSource.next(valor);
  }

  async loadStoredValues() {
    const desempEtanol = await this.storage.get('desempEtanol');
    const desempGas = await this.storage.get('desempGas');

    if (desempEtanol) this.desempEtanolSource.next(desempEtanol);
    if (desempGas) this.desempGasSource.next(desempGas);
  }
}