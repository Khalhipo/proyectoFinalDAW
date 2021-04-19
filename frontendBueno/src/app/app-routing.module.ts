import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';

import { UserRouterGuard } from './auth/user-router.guard';
import { SocialComponent } from './components/social/social.component';
import { HomeComponent } from './components/home/home.component';
import { StatsComponent } from './components/stats/stats.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';

const routes: Routes = [
  {path:"home",component:HomeComponent, canActivate:[UserRouterGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"social",component:SocialComponent, canActivate:[UserRouterGuard]},
  {path:"stats",component:StatsComponent, canActivate:[UserRouterGuard]},
  {path:"profile",component:ProfileComponent, canActivate:[UserRouterGuard]},
  {path:"aboutme",component:AboutmeComponent},
  {path:"**",component:HomeComponent, canActivate:[UserRouterGuard]},
  {path:"",component:HomeComponent, canActivate:[UserRouterGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
