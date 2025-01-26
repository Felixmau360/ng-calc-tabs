import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { FirstTimeModalComponent } from '../first-time-modal/first-time-modal.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private modalController: ModalController) {}

  async ngOnInit() {
    const hasSeenModal = localStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenModal) {
      await this.presentModal();
      localStorage.setItem('hasSeenWelcomeModal', 'true');
    }      
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: FirstTimeModalComponent,
      cssClass: 'welcome-modal',
      });
    return await modal.present();
  } 
}
