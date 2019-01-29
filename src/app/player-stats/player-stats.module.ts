import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlayerStatsPage } from './player-stats.page';
import {MatCardModule} from "@angular/material";

const routes: Routes = [
  {
    path: '',
    component: PlayerStatsPage
  }
];

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      RouterModule.forChild(routes),
      MatCardModule,

  ],
  declarations: [PlayerStatsPage]
})
export class PlayerStatsPageModule {}
