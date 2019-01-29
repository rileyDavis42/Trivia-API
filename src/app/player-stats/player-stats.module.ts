import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlayerStatsPage } from './player-stats.page';
import {MatCardModule} from "@angular/material";
import {HeaderComponent} from "../shared/header/header.component";
import {SharedModule} from "../shared/shared.module";

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
      SharedModule,
      RouterModule.forChild(routes),
      MatCardModule,

  ],
  declarations: [PlayerStatsPage]
})
export class PlayerStatsPageModule {}
