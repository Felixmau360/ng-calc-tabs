import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-time-modal',
  templateUrl: './first-time-modal.component.html',
  styleUrls: ['./first-time-modal.component.scss'],
})
export class FirstTimeModalComponent {

  constructor(private modalController: ModalController, private router: Router) { }

  async dismissModal() {
    await this.modalController.dismiss();
    this.router.navigate(['/tabs/settings']);
 }
}
