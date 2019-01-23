import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
<<<<<<< HEAD
=======
  { path: 'game-details', loadChildren: './game-details/game-details.module#GameDetailsPageModule' },
  { path: 'trivia-page', loadChildren: './trivia-page/trivia-page.module#TriviaPagePageModule' },
  { path: 'player-stats', loadChildren: './player-stats/player-stats.module#PlayerStatsPageModule' },
>>>>>>> c931ca2ecd52f3bd0cc467e038f73b7007d406f2
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
