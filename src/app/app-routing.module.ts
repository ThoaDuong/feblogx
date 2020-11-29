import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeBasicComponent } from './pages/home-basic/home-basic.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeBasicComponent },
  { path: 'post', component: EditorComponent, canActivate: [AuthGuard] },
  { path: 'detail', component: DetailComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
