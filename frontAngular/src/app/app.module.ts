import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import '@angular/common/locales/global/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnviarTokenInterceptor } from './auth/enviar-token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialComponent } from './components/social/social.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkoutDetailComponent } from './components/workout-detail/workout-detail.component';
import { WorkoutCreateComponent } from './components/workout-create/workout-create.component';
import { StatsComponent } from './components/stats/stats.component';
import { WorkoutUpdateComponent } from './components/workout-update/workout-update.component';
import { SobremiComponent } from './components/sobremi/sobremi.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    SocialComponent,
    HomeComponent,
    WorkoutDetailComponent,
    WorkoutCreateComponent,
    StatsComponent,
    WorkoutUpdateComponent,
    SobremiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {provide:LOCALE_ID, useValue:"es"}, 
    {provide: HTTP_INTERCEPTORS, useClass:EnviarTokenInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
