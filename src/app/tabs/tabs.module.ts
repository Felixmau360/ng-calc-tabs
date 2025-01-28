import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Adicione essa linha

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { FirstTimeModalComponent } from '../first-time-modal/first-time-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule, // Adicione essa linha
    TabsPageRoutingModule,
  ],
  declarations: [TabsPage, FirstTimeModalComponent]
})
export class TabsPageModule {}
