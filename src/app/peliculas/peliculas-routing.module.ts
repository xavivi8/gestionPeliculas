import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FavPageComponent } from './pages/fav-page/fav-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'fav', component: FavPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
