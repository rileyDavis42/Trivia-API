import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuController} from "@ionic/angular";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'game-details', loadChildren: './game-details/game-details.module#GameDetailsPageModule' },
  { path: 'trivia-page', loadChildren: './trivia-page/trivia-page.module#TriviaPagePageModule' },
  { path: 'player-stats', loadChildren: './player-stats/player-stats.module#PlayerStatsPageModule' },
  { path: 'my-games', loadChildren: './my-games/my-games.module#MyGamesPageModule' },
  { path: '**', loadChildren: './home/home.module#HomePageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}